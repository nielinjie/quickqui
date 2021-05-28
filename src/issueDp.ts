import {
  DataProvider,
  forResourceAndFetchTypeOneParam,
  GetListParams,
  GetListResult,
  GET_LIST,
} from "@quick-qui/data-provider";
import { implementationGlobal } from "@quick-qui/model-defines";
import _ from "lodash";

const byTypes = forResourceAndFetchTypeOneParam(
  "IssueByFinished",
  GET_LIST,
  async (): Promise<GetListResult<unknown>> => {
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    const allData = await existingDp(GET_LIST, "Issue", {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
      filter: {},
    } as GetListParams);
    const grouped = _(allData.data)
      .map((issue) => ({ ...issue, done: issue.done ? "yes" : "no" }))
      .countBy("done")
      .value();
    return {
      total: 2, //finished or not
      /*
      data: 
        - doneOrNot: 'yes'
          y: countOf(finished)
        - doneOrNot : 'no'
          y: countOf(not finished)
       */
      data: [
        { id: 0, doneOrNot: "yes", count: grouped["yes"] } as unknown,
        { id: 1, doneOrNot: "no", count: grouped["no"] },
      ],
    } as GetListResult<unknown>
  }
);
export default byTypes;
