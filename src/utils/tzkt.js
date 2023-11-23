

import axios from "axios";

export const fetchStorage = async () => {

    const res = await axios.get("https://api.ghostnet.tzkt.io/v1/contracts/KT1TRHqoWYzzdMB4J3TquqxLCVU9oG5b5HS9Bog/storage");
    return res.data;
};
