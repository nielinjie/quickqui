import _ from "lodash";
import { onlyMerger, simpleMerger } from "../util";

const multipleModels = {
  ...onlyMerger(),merge:simpleMerger('pages','pageModel.pages')
};
export default multipleModels;
