export default function flexbox(params: {
  justifyContent?: "center" | "start" | "space-between" | "space-around";
  alignItems?: "center" | "start" | "stretch";
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap";
}) {
  return {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    ...params,
  };
}
