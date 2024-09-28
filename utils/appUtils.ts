const AppUtils = {
  deepCloneData(data: any) {
    return JSON.parse(JSON.stringify(data));
  },
};
export default AppUtils;
