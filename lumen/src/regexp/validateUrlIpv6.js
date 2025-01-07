// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

// Punting on real IPv6 validation for now
const validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
export default validateUrlIpv6;
