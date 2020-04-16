import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
    Graticule
} from "react-simple-maps";
import { colors } from "@material-ui/core";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const rounded = num => {
//     if (num > 1000000000) {
//         return Math.round(num / 100000000) / 10 + "Bn";
//     } else if (num > 1000000) {
//         return Math.round(num / 100000) / 10 + "M";
//     } else {
//         return Math.round(num / 100) / 10 + "K";
//     }
// };

const MapChart = props => {
    const { highlightOptions, onHover } = props;

    const getFillColor = properties => {
        if(highlightOptions[properties.ISO_A3]) {
            return colors.red[highlightOptions[properties.ISO_A3]['colorAlpha']];
        } else {
            return colors.grey[300]
        }
    }

    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup>
                    <Graticule stroke={colors.indigo[300]} />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const fillColor = getFillColor(geo.properties);
                                return <Geography
                                    fill={fillColor}
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        onHover(geo.properties);
                                    }}
                                    onMouseLeave={() => {
                                        onHover("");
                                    }}
                                    style={{
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                                })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default memo(MapChart);
