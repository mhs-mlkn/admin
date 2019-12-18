import treemapData2 from "./treemap.json";

console.log(treemapData);

export default function treemapData(report, data) {
  const name = "نام نمودار";

  return {
    series: [
      {
        name,
        type: "treemap",
        visibleMin: 300,
        data: treemapData2.children,
        leafDepth: 2,
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: "#555",
                borderWidth: 4,
                gapWidth: 4
              }
            }
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.7,
                gapWidth: 2,
                borderWidth: 2
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.6,
                gapWidth: 1
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5]
          }
        ]
      }
    ]
  };
}
