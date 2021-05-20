// 高德map   https://webapi.amap.com/maps?v=1.4.11&key=你的高德地图的key
export default function MapLoader() {
  const key = 'd8b71509997fad0976de6c9a460bee29';
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        `http://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=${key}&plugin=AMap.Object3DLayer,AMap.DistrictSearch,AMap.Geocoder`;
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}