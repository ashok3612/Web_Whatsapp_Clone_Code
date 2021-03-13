export function Refreshtoken(res) {
    const refreshTime = (res.tokenObj.expires_in || 3600 - 5 * 60) * 100;
     const refresh = async () => {
        const newAuthRes = await res.reloadAuthResponse;
        const refreshTimeNew = (newAuthRes.expires_in || 3600 - 5 * 60) * 100;

        console.log(newAuthRes.id_token);

        setTimeout(newAuthRes, refreshTimeNew);
     };
     setTimeout(refresh, refreshTime);
}
