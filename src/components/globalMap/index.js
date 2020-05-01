import React, { useEffect, useState } from "react";
import API from "../../utils/RequestUtil";
import MapComponent from "../../common/component/MapComponent";
import { clamp, parseDate } from "../../utils/CommonUtils";
import ReactTooltip from "react-tooltip";
import { Typography, CircularProgress, Paper } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import CustomModal from "../../common/component/CustomModal";


const GlobalMap = props => {
    // call and get global data;
    const [caseInfo, setCaseInfo] = useState(null);
    const [tooltipContent, setTooltipContent] = useState();
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const _maxReduce = (x, y) => {
            if (x.cases && y.cases) {
                return (x.cases > y.cases) ? x : y;
            }
            return x;
        }

        const _minReduce = (x, y) => {
            if (x.cases && y.cases) {
                return (x.cases < y.cases) ? x : y;
            }
            return x;
        }

        const roundToNearHundred = number => Math.round(number / 100) * 100;

        const onSuccess = res => {
            const countriesStat = res;
            let copyOfcaseInfo = {};

            const maxValue = countriesStat.reduce(_maxReduce).cases;
            const minValue = countriesStat.reduce(_minReduce).cases;

            countriesStat.forEach(cInfo => {
                const { cases, countryInfo: { iso3 } } = cInfo
                const constrainedFill = clamp(cases, minValue, maxValue, 200, 900);
                if (iso3) {
                    copyOfcaseInfo[iso3] = {
                        colorAlpha: roundToNearHundred(constrainedFill),
                        data: cInfo
                    }
                }
            });

            setCaseInfo(copyOfcaseInfo);
        }

        const onFailed = err => {
            console.log("error", err);
            setError({
                message: "Failed to fetch map data",
                fullMessager: err
            });
        };

        API.call("/v2/countries", onSuccess, onFailed);
    }, []);

    const onHover = (properties, hasValue = true) => {
        if (!hasValue) {
            const { NAME, SUBREGION } = properties;
            console.log(properties);
            const noContent = <>
                <Typography variant="h5">{NAME}</Typography>
                <Typography variant="h6">{SUBREGION}</Typography>
                <Typography variant="body2">No data available</Typography>
            </>
            setTooltipContent(noContent);
            return;
        }

        const countryInfo = caseInfo[properties.ISO_A3];

        if (countryInfo) {
            const { data: { updated, country, cases, recovered, deaths, active, tests } } = caseInfo[properties.ISO_A3];
            const { data: { todayDeaths, todayCases } } = caseInfo[properties.ISO_A3];

            const content = <>
                <Typography variant="h5">{country}</Typography>
                <Typography variant="h6">{parseDate(updated)}</Typography>
                <div>
                    <div>CASES: {cases} [+{todayCases}]</div>
                    <div>RECOVERED: {recovered}</div>
                    <div>DEATHS: {deaths} [+{todayDeaths}]</div>
                    <div>ACTIVE: {active}</div>
                    <div>TESTS: {tests}</div>
                </div>
            </>

            setTooltipContent(content);
        }
    }

    const onCountryClick = (geo) => {
        setSelectedCountry(geo);
    };

    const renderGlobalMap = () => {
        return <>
            <Paper style={{ padding: 10 }}>
                <MapComponent
                    highlightOptions={caseInfo}
                    onHover={onHover}
                    onCountryClick={onCountryClick}
                />
                <ReactTooltip>{tooltipContent}</ReactTooltip>
            </Paper>
            {selectedCountry != null &&
                <CustomModal open={true} onClose={() => console.log("closing...")}>
                    <p>I'm a custom Modal</p>
                </CustomModal>
            }
        </>
    }

    if (error) {
        return <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
        </Alert>
    }

    console.log(selectedCountry);

    return caseInfo ? renderGlobalMap() : <CircularProgress />
}

export default GlobalMap;