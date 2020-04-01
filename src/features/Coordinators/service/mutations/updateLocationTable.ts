import { Response } from 'express';
import axios from 'axios';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { globals } from '../../../../_shared/globals';
import {
  updateEntityRecord,
  getAllRecords,
  getEntityRecordFromKey,
} from '../../../../_shared/services';

export interface Company extends Record<string, string | boolean | number> {
  location_id: number;
}

export const updateLocationTableTask = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const studentQuery = `select * from student where acad_year = ? AND user_id > ?`;
    const students = await dbInstance.runPreparedSelectQuery(studentQuery, [
      globals.school.ACAD_YEAR,
      2731,
    ]);

    return (async function updateLocation(index: number): Promise<Response> {
      if (!students[index]) {
        return res.status(200).send({ data: 'successful' });
      }

      const googlePlaceId = students[index].google_place_id;
      const locationId = students[index].location_id;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&key=${globals.GOOGLE_MAPS_API_KEY}`;

      const resp = await axios.get(url);
      const ac = resp.data.result.address_components;
      const { result } = resp.data;

      const routeObject = ac.find((c) => c.types.includes('route'));

      const localityObject = ac.find((c) => c.types.includes('locality'));

      //   const subLocalityObject = ac.find(c => c.types.includes("sub_locality"));

      const metropolisObject = ac.find((c) =>
        c.types.includes('administrative_area_level_2')
      );

      const regionObject = ac.find((c) =>
        c.types.includes('administrative_area_level_1')
      );

      const countryObject = ac.find((c) => c.types.includes('country'));

      const route = routeObject ? `${routeObject.short_name},` : '';
      const locality = localityObject ? `${localityObject.long_name},` : '';
      const regionName = regionObject ? regionObject.long_name : '';
      const districtName = metropolisObject ? metropolisObject.long_name : '';
      const countryName = countryObject ? countryObject.long_name : '';

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
        locationId,
      ];

      const updateQuery = `update location set name = ?, address = ?, detailed_address = ?,
      district = ?, region = ? where id = ?`;

      await updateEntityRecord(updateQuery, [locationData], dbInstance);
      return updateLocation(++index);
    })(0);
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};

export const resetCompanyArchiveLocation = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const companies = await getAllRecords('company_archive', dbInstance);
    return (async function updateCompanyLocation(index): Promise<Response> {
      if (!companies[index]) {
        return res.status(200).send({ data: 'successful' });
      }

      const companyWithLocation = await getEntityRecordFromKey(
        'company',
        'name',
        [companies[index].name],
        dbInstance
      );

      const updateQuery = `update company_archive set location_id = ? where id = ?`;
      const locationId =
        (companyWithLocation as Company[]).length !== 0
          ? (companyWithLocation as Company[])[0].location_id
          : null;
      const data = [locationId, companies[index].id];
      await updateEntityRecord(updateQuery, [data], dbInstance);
      return updateCompanyLocation(++index);
    })(0);
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
