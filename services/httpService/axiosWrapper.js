import axios from "axios";
import { has, getErrorMessage } from '../../utils';
import logger from "../logger";

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const logName = () => {
    if (!response || !has(response, 'status') || !has(response.config, 'url')) return `[EMPTY RESPONSE]`;
    return `[URL: ${response.config.url}, STATUS: ${response.status}]`
  };
  if (response.status === 200) {
    logger.info(response.data, logName());
  } else {
    logger.log(response.data, logName());
  }
  return response;
}, (error) => {
  const logName = () => {
    if (!has(error, 'response') || !has(error.response, 'status') || !has(error.response.config, 'url')) return `[EMPTY RESPONSE]`;
    return `[URL: ${error.response.config.url}, STATUS: ${error.response.status}]`
  };
  logger.error(error, logName());
  return Promise.reject(getErrorMessage(error));
});
