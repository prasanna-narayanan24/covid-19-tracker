import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule
} from "react-simple-maps";
import { colors } from "@material-ui/core";
import Proptypes from "prop-types";
import { Alert, AlertTitle } from '@material-ui/lab';
import jsonData from "../data/world-map.json";

// BROKEN
// const geoUrl =
//     "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = props => {
    const { highlightOptions, onHover, onCountryClick } = props;

    const getFillColor = properties => {
        if (highlightOptions[properties.ISO_A3]) {
            return colors.red[highlightOptions[properties.ISO_A3]['colorAlpha']];
        } else {
            return colors.grey[300]
        }
    }

    try {
        return (
            <>
                <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
                    <Graticule stroke={colors.indigo[300]} />
                    <Geographies  geography={jsonData} onError={console.log}>
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
                                        onHover(geo.properties, false);
                                    }}
                                    onClick={e => { e.preventDefault(); onCountryClick(geo) }}
                                    style={{
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none",
                                            boxShadow: "none"
                                        },
                                        focus: {
                                            outline: "none",
                                            boxShadow: "none"
                                        }
                                    }}
                                />
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </>
        );
    } catch (error) {
        console.log("Caught!!!");
        return <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
        </Alert>
    }
};

MapChart.propTypes = {
    highlightOptions: Proptypes.object,
    onHover: Proptypes.func,
    onCountryClick: Proptypes.func
}

MapChart.defaultProps = {
    highlightOptions: {},
    onHover: () => { },
    onCountryClick: () => { }
}

export default memo(MapChart);
