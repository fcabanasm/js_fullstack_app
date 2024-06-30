import { name, internet, date, datatype } from "faker";

export default () => {
  const title = name.title();
  const url = internet.url();
  const story_title = name.title();
  const story_url = internet.url();
  const created_at = date.past();
  const objectID = datatype.number;

  return { title, url, story_title, story_url, created_at, objectID };
};
