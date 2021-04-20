import AMapLoader from "@amap/amap-jsapi-loader";

const Map = AMapLoader.load({
  key: "94ac13f4f0ae0f2f863a6ffbf0b619f5",
  version: "2.0",
  // plugins: [],
}).then((AMap) => {
  const map = new AMap.Map("map", {
    zoom: 12,
    center: [104.061018, 30.641144],
    mapStyle: "amap://styles/darkblue",
  });

  return { map, AMap };
});

export default Map;
