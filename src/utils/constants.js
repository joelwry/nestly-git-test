const SKILL_LEVEL = new Array(
  "beginner",
  "basic level",
  "intermediate level",
  "advance"
);

const DEV = false;

const hostname = DEV ? "http://localhost" : "https://giitafrica.com";

const client_domain = DEV ? `${hostname}:1408` : `${hostname}`;

const COST_SPREAD = new Array("all", "free", "paid");

const domain = DEV ? `${hostname}:3300` : `https://giitafrica.com`;

const default_admin = "adminstrators~123giitafrica~1234567890123";

const seminar_backend = `https://seminar.giitafrica.com`;

const seminar_frontend = "https://giitfoundation.org";

const month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
});

const organisation_name = "Globalstar Innovative Information Technology";

export {
  SKILL_LEVEL,
  COST_SPREAD,
  domain,
  hostname,
  client_domain,
  month_index,
  default_admin,
  organisation_name,
  seminar_backend,
  seminar_frontend,
  DEV,
};
