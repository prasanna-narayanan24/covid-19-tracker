import React, { useEffect, useState } from "react";
import API from "../../utils/RequestUtil";
import MapComponent from "../../common/component/MapComponent";
import { clamp, parseDate } from "../../utils/CommonUtils";
import ReactTooltip from "react-tooltip";
import { Typography } from "@material-ui/core";

const GlobalMap = props => {
    // call and get global data;
    const [highlightOptions, setHighlightOptions] = useState({});
    const [tooltipContent, setTooltipContent] = useState();

    useEffect(() => {
        const _reduce = (x, y) => {
            if (x.cases && y.cases) {
                return (x.cases > y.cases) ? x : y;
            }
            return x;
        }

        const roundToNearHundred = number => Math.round(number / 100) * 100;

        const onSuccess = res => {
            const countriesStat = res;
            let copyOfHighlightOptions = {};

            let maxValue = countriesStat.reduce(_reduce).cases;
            countriesStat.forEach(cInfo => {
                const { cases, countryInfo: { iso3 } } = cInfo
                const constrainedFill = clamp(cases, 0, maxValue, 100, 900);
                if (iso3) {
                    copyOfHighlightOptions[iso3] = {
                        colorAlpha: roundToNearHundred(constrainedFill),
                        data: cInfo
                    }
                }
            });
            
            setHighlightOptions(copyOfHighlightOptions);
        }

        const onFailed = console.error;

        API.call("/countries", onSuccess, onFailed);
    }, []);

    const onHover = properties => {
        const countryInfo = highlightOptions[properties.ISO_A3];

        if (countryInfo) {
            const { data: { updated, country, cases, recovered, deaths, active, tests } } = highlightOptions[properties.ISO_A3];
            const content = <>
                <Typography variant="h5">{country}</Typography>
                <Typography variant="h6">{parseDate(updated)}</Typography>
                <div>
                    <div>CASES: {cases}</div>
                    <div>RECOVERED: {recovered}</div>
                    <div>DEATHS: {deaths}</div>
                    <div>ACTIVE: {active}</div>
                    <div>TESTS: {tests}</div>
                </div>
            </>

            setTooltipContent(content);
        }
    }

    return <>
        <MapComponent
            highlightOptions={highlightOptions}
            onHover={onHover}
        />
        <ReactTooltip>{tooltipContent}</ReactTooltip>
    </>
}

export default GlobalMap;