export async function fetchWithAErrors(url, options = {}, responseType = "json") {
  const AERRORS = {
    400: [{ code: "A002", meaning: "Parsing Error" }, { code: "A004", meaning: "Protocol violation" }, { code: "A005(3)", meaning: "Service unsupported on browser" }],
    401: [{ code: "A006", meaning: "Credentials invalid" }],
    403: [{ code: "A007", meaning: "Credentials forbidden" }],
    404: [{ code: "A001", meaning: "Page not found" }, { code: "A001(1)", meaning: "Previous page not found/missing" }, { code: "A998", meaning: "Under Construction" }],
    426: [{ code: "A005(1)", meaning: "Service outdated" }],
    500: [{ code: "A003", meaning: "Server overload/Server error" }],
    501: [{ code: "A005(2)", meaning: "Service unimplemented on version" }],
    503: [{ code: "A005", meaning: "Service unavailable" }],
    504: [{ code: "A008", meaning: "Response duration timeout" }]
  };

  function now() {
    return new Date().toLocaleString();
  }

  function getAError(status, preferredCode = null) {
        const list = AERRORS[status];
        if (!list) return null;
        if (!preferredCode) return list[0];
        return list.find(e => e.code === preferredCode) || list[0];
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const aerror = getAError(response.status);
      if (aerror) {
        console.error(`${aerror.code} — ${aerror.meaning} @ ${now()} • HTTP ${response.status} ${response.url}`);
      } else {
        console.error(`HTTP ${response.status} — ${response.statusText} @ ${now()} • ${response.url}`);
      }
      throw new Error(`HTTP ${response.status} error`);
    }

    // parse the thing
    try {
      if (responseType === "text") {
        return await response.text();
      }

      // defaulted to json
      return await response.json();

    } catch (parseErr) {
      console.error(`A002 — Parsing Error @ ${now()}`, parseErr);
      throw parseErr;
    }

  } catch (err) {
    // Network / fetch-level errors
    if (err instanceof TypeError) {
      console.error(`A003 — Server overload / Network failure @ ${now()}`, err);
    }
    throw err;
  }
}