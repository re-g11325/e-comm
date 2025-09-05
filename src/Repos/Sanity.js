//read-only eCommClients
//api key
//sknBIYosJg0588ZEQTWD0IJN24gMzq0iDUpfxO7kCcPIjieyUjOgCrr5yYnhD0zvMlB3Jh6CQSpoVvPAEYjRmmfkCIrUQyUEyQd5Pa1mTDUJXxIoiHNnT86P0F4J71x3UZuDwFUZ1pw1vJqgLxF2SECRXNL0DS3w5wm34mkUqEFtLjtcvfEm
//project id
//2kwpmrhw

let COMPANY_ID = "";
let PROJECT_ID = "";
let DATASET = "production";
let API_KEY = "";
let apiURL = "";

// ----- MAIN -----
const apiQuery = (_url, _method, _body, _onSuccess, _onFail) => {
  // console.log("apiUrl", apiURL);
  fetch(apiURL + _url, {
    method: _method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: _body ? JSON.stringify(_body) : _body,
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("did we arrive to the result?", result);
      _onSuccess(result);
    })
    .catch((error) => {
      _onFail(error);
    });
};
let queryUrl = (_query) => {
  return `query/${DATASET}?query=${_query}`;
};
let mutateUrl = () => {
  return `mutate/${DATASET}`;
};

// ----- GET -----
function createSanityQuery(filterObject, fields = ["..."]) {
  if (typeof filterObject !== "object" || filterObject === null) {
    throw new Error("filterObject must be a non-null object");
  }

  // Build the filter string based on the object's properties
  const filters = Object.entries(filterObject).map(([key, value]) => {
    if (typeof value === "string") {
      // return `${key} == '${value}'`;
      return `${key} match '*${value}*'`;
    } else if (typeof value === "number") {
      return `${key} == ${value}`;
    } else {
      throw new Error(`Unsupported value type for key ${key}: ${typeof value}`);
    }
  });

  var joinedFilters = filters.join(" && ");

  // Build the fields string
  const fieldsString = fields.join(", ");

  // Combine the filters and fields into the query
  const query = `*[${joinedFilters}] { ${fieldsString} }`;

  return query;
}
const getDocumentCommand = (_document, _fields = ["..."]) => {
  // console.log(
  //   "getting document command",
  //   createSanityQuery(_document, _fields)
  // );
  return encodeURIComponent(`${createSanityQuery(_document, _fields)}`);
};
const getProfilesCommand = (_document, _fields = ["..."]) => {
  const fieldsString = _fields.join(", ");
  return encodeURIComponent(
    `*[ _type == '${_document._type}'   ] { ${fieldsString} }`
  );
};

// ----- POST -----
const deleteDocumentBody = (_document) => {
  return {
    mutations: [
      {
        delete: {
          query: `*[(_type == '${_document._type}' && _id == '${_document._id}') ]`, //now that his balance has changed i nnegative, we deleted other offer he made
        },
      },
    ],
  };
};
const createDocumentBody = (_document) => {
  return {
    mutations: [
      {
        create: {
          ..._document,
        },
      },
    ],
  };
};
const updateDocumentBody = (_document) => {
  let documentToCreate = { ..._document };
  delete documentToCreate._id;
  delete documentToCreate._type;
  delete documentToCreate._updatedAt;
  delete documentToCreate._rev;
  delete documentToCreate._createdAt;

  //console.log(documentToCreate);
  //console.log(_document);
  return {
    mutations: [
      {
        patch: {
          query: `*[ _id == '${_document._id}']`,
          set: {
            ...documentToCreate,
          },
        },
      },
    ],
  };
};

// ----- EXPORTS -----
export const deleteDocument = (_document, _onSuccess) => {
  apiQuery(
    mutateUrl(),
    "post",
    deleteDocumentBody(_document),
    (result) => {
      //console.log(result);
      _onSuccess(result);
    },
    (error) => console.error(error)
  );
  //   Alert.alert("Elimina", "Eliminare ? ", [
  //     {
  //       text: "Yes",
  //       onPress: () => {
  //         if (_document) {
  //         } else {
  //           console.error("no target ");
  //         }
  //       },
  //     },
  //     {
  //       text: "No",
  //       onPress: () => {
  //         _onSuccess([]);
  //         // console.log("no pressed");
  //       },
  //       style: "cancel",
  //     },
  //   ]);
};
export const createDocument = (_document, _onSuccess) => {
  if (_document) {
    apiQuery(
      mutateUrl(),
      "post",
      createDocumentBody(_document),
      (result) => {
        console.log("sanity creation", result);
        _onSuccess(result);
      },
      (error) => console.error(error)
    );
  } else {
    console.error("no target ");
  }
};
export const updateDocument = (_document, _onSuccess) => {
  if (_document) {
    apiQuery(
      mutateUrl(),
      "post",
      updateDocumentBody(_document),
      (result) => {
        console.log(result);
        _onSuccess(result);
      },
      (error) => console.error(error)
    );
  } else {
    console.error("no target ");
  }
};
export const getDocument = (_document, _onSuccess, _fields = ["..."]) => {
  apiQuery(
    queryUrl(getDocumentCommand(_document, _fields)),
    "get",
    undefined,
    (result) => {
      //let resultedUser = result.result[0];
      _onSuccess(result.result);
    },
    (error) => console.log(error)
  );
};
export const getProfiles = (_document, _onSuccess, _fields = ["..."]) => {
  apiQuery(
    queryUrl(getProfilesCommand(_document, _fields)),
    "get",
    undefined,
    (result) => {
      //let resultedUser = result.result[0];
      console.log("result get profiles", result);
      _onSuccess(result.result);
    },
    (error) => console.log("error in getProfiles ", error)
  );
};
export const setProjectId = (_prjID) => {
  PROJECT_ID = _prjID;
  apiURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/`;
};
export const setApiKey = (_apiKey) => {
  API_KEY = _apiKey;
};
export const setCompanyId = (_companyId) => {
  COMPANY_ID = _companyId;
};
export const getCompanyId = () => {
  return COMPANY_ID;
};
