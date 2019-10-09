import { createWriteStream } from "fs";
import axios, { AxiosResponse } from "axios";

export const downloadAndSaveResource: (
  url: string,
  output: string,
) => Promise<void> = async (url, output) => {
  const writer = createWriteStream(output);
  const response: AxiosResponse = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};
