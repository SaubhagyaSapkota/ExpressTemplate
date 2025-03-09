import { networkInterfaces } from 'os';

export const getLocalIp = () => {
    const nets = networkInterfaces();
    let localIp;

    // Find a suitable IP address (non-internal IPv4)
    Object.keys(nets).forEach((interfaceName) => {
        nets[interfaceName]?.forEach((net) => {
            if (net.family === 'IPv4' && !net.internal) {
                localIp = net.address;
            }
        });
    });

    return localIp;
};
