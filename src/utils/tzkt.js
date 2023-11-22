

import axios from "axios";

export const fetchStorage = async () => {

    const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1Qv5wVgps3xCsPtTq8vmDB5niKisB37Bog/storage");
    return res.data;
};
