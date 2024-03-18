import { Grid } from "@mui/material";

export const LogsData = () => {

    
    const dummyLogsData = [
        {
            id: "0",
            request_id: "1",
            query: "show me some good italian restraunts",
            stage: "optimize_layer",
            tokens: "1697108146827",
            time: "1697108146827"
        },

        {
            id: "1",
            request_id: "1",
            query: "show me some good italian restraunts",
            stage: "optimize_layer",
            tokens: "1697108146827",
            time: "1697108146827"
        }
    ];
    return (
        <Grid item xs={4}>
        <div >
            <h2>Logs data</h2>
            <div>
                {dummyLogsData.map((item, i) => (
                    <div >
                        <div>
                            <p>Query</p>
                            <p>{item.query}</p>
                        </div>
                        <div>
                            <p>Stage</p>
                            <p>{item.stage}</p>
                        </div>
                        <div>
                            <p>Tokens</p>
                            <p>{item.tokens}</p>
                        </div>
                        <div>
                            <p>Timestamp</p>
                            <p>{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Grid>
    );
};