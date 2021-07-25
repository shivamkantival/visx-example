export default function flexbox(params: {
  justifyContent?: "center" | "start";
  alignItems?: "center" | "start" | "stretch";
  flexDirection?: "row" | "column";
}) {
  return {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    ...params,
  };
}
