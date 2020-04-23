import React, { useEffect, useState } from "react";
import { Typography, makeStyles, colors, CircularProgress, Grid, Paper } from "@material-ui/core";
import { parseDate, shortNumber } from "../../utils/CommonUtils";
import NumberOutput from "../../common/component/NumberOutput";
import API from "../../utils/RequestUtil";

const useStyles = makeStyles(theme => ({
    boldText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        marginBottom: 10,
    },
    bolder: {
        fontWeight: "bolder",
        marginBottom: 5,
    },
    colDisp: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 30,
    },
    rowDisp: {
        display: "flex"
    }
}));

const Statistics = props => {
    const styles = useStyles();
    const [state, setState] = useState({});

    useEffect(() => {
        const onGlobalStatFetchSuccess = res => {
            const { cases, recovered, deaths, updated, active } = res;
            const { todayCases, todayDeaths } = res;
            let clonedState = {
                confirmed: cases,
                recovered,
                deaths,
                lastUpdate: updated,
                active,
                todayCases,
                todayDeaths
            };

            setState(clonedState);
        }

        const onGlobalStatFetchFailed = console.error;

        API.call("/v2/all", onGlobalStatFetchSuccess, onGlobalStatFetchFailed);
    }, []);

    const renderStats = () => {
        const { lastUpdate, confirmed, recovered, deaths, active } = state;
        const { todayCases, todayDeaths } = state;

        const shortTodayCases = shortNumber(todayCases);
        const shortTodayDeaths = shortNumber(todayDeaths);

        return <Paper style={{ padding: "10%" }}>
            <Typography variant="subtitle2" color="primary">
                <div className={styles.colDisp}>
                    <span style={{ opacity: .7 }}>last updated</span>
                    <span className={styles.boldText}>{parseDate(lastUpdate)}</span>
                </div>
            </Typography>

            <Grid container>
                <Grid item xs={6} md={6} lg={6}>
                    <div className={styles.colDisp}>
                        <Typography color="error" className={styles.boldText}>confirmed</Typography>
                        <Typography color="error" className={styles.bolder}><NumberOutput end={confirmed} /></Typography>
                        {todayCases && <Typography variant="body2" component="small" color="error">[+{shortTodayCases}]</Typography>}
                    </div>
                </Grid>
                <Grid item xs={6} md={4} lg={4}>
                    <div className={styles.colDisp}>
                        <Typography color="textSecondary" className={styles.boldText}>deaths</Typography>
                        <Typography color="textSecondary" className={styles.bolder}><NumberOutput end={deaths} /></Typography>
                        {todayDeaths && <Typography variant="body2" component="small" color="textSecondary">[+{shortTodayDeaths}]</Typography>}
                    </div>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <div className={styles.colDisp}>
                        <Typography color="primary" className={styles.boldText}>active</Typography>
                        <Typography color="primary" className={styles.bolder}><NumberOutput end={active} /></Typography>
                    </div>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <div className={styles.colDisp}>
                        <Typography style={{ color: colors.green[500] }} className={styles.boldText}>recovered</Typography>
                        <Typography style={{ color: colors.green[500] }} className={styles.bolder}><NumberOutput end={recovered} /></Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    };

    return state.lastUpdate ? renderStats() : <CircularProgress />
}

export default React.memo(Statistics);