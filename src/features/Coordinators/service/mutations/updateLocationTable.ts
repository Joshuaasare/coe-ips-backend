import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { globals } from "../../../../_shared/globals";
import axios from "axios";
import { updateEntityRecord } from "../../../../_shared/services";

export const updateLocationTable = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { user, dbInstance } = req;
    const studentQuery = `select * from student where acad_year = ?`;
    const students = await dbInstance.runPreparedSelectQuery(studentQuery, [
      globals.school.ACAD_YEAR
    ]);

    (async function updateLocation(index: number) {
      if (!students[index]) {
        return res.status(200).send({ data: "successful" });
      }

      const googlePlaceId = students[index].google_place_id;
      const locationId = students[index].location_id;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&key=${globals.GOOGLE_MAPS_API_KEY}`;

      const resp = await axios.get(url);
      const ac = resp.data.result.address_components;
      const result = resp.data.result;

      const routeObject = ac.find(c => c.types.includes("route"));

      const localityObject = ac.find(c => c.types.includes("locality"));

      //   const subLocalityObject = ac.find(c => c.types.includes("sub_locality"));

      const metropolisObject = ac.find(c =>
        c.types.includes("administrative_area_level_2")
      );

      const regionObject = ac.find(c =>
        c.types.includes("administrative_area_level_1")
      );

      const countryObject = ac.find(c => c.types.includes("country"));

      console.log(result.formatted_address);
      const route = routeObject ? `${routeObject.short_name},` : "";
      const locality = localityObject ? `${localityObject.long_name},` : "";
      const regionName = regionObject ? regionObject.long_name : "";
      const districtName = metropolisObject ? metropolisObject.long_name : "";
      const countryName = countryObject ? countryObject.long_name : "";

      const name = result.formatted_address;
      const address = `${result.name},${locality}${countryName}`;
      const detailedAddress = `${route}${locality}${districtName},${regionName},${countryName}`;
      const district = districtName;
      const region = regionName;

      const locationData = [
        name,
        address,
        detailedAddress,
        district,
        region,
        locationId
      ];
      console.log(locationData);

      const updateQuery = `update location set name = ?, address = ?, detailed_address = ?,
      district = ?, region = ? where id = ?`;

      await updateEntityRecord(updateQuery, [locationData], dbInstance);
      updateLocation(++index);
    })(0);
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
