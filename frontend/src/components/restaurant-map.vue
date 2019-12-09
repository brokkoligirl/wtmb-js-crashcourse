<script>

import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet'


export default {
  name: "RestaurantMap",
  components: {
        'v-map': LMap,
        'v-tilelayer': LTileLayer,
        'v-marker': LMarker,
        'v-popup': LPopup
    },
  props: ["restaurant"],
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 17,
      center: [this.restaurant.latitude, this.restaurant.longitude],
      markerLatLng: [this.restaurant.latitude, this.restaurant.longitude],
    };
  }
};
</script>

<template lang="pug">
main 
    h4 Location, location, location
    #mapid
        v-map(:zoom="zoom" :center="center")
            v-tilelayer(:url="url")
            v-marker(:lat-lng="markerLatLng" @add="$nextTick(() => $event.target.openPopup())")
                v-popup
                    p.popup 
                        .line: b {{restaurant.formattedAddress.split(',')[0]}}
                        .line {{restaurant.streetName}} {{restaurant.streetNumber}}
                        .line {{restaurant.zipcode}} {{restaurant.state}}

</template>

<style scoped>
@import "~leaflet/dist/leaflet.css";

#mapid { 
  height: 280px; 
  width: 360px;
  border-style: dotted;
  border-width: 2px;
  border-color: black;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>