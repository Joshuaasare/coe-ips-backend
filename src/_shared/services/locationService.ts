import { Response, Request } from 'express';
import axios from 'axios';
import { globals } from '../globals';

export const getPlacesFromSearchKey = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { searchKey } = req.query;
    const proxyUrl = 'https://coe-cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKey}&key=${globals.GOOGLE_MAPS_API_KEY}&components=country:gh|country:ng|country:ke|country:ci|country:gm`;
    const resp = await axios.get(`${proxyUrl}${url}`);
    return res.status(200).send({ data: resp });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
