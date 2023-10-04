import React, { useState } from 'react';
import {
  View,
  Grid,
  Form,
  TextField,
  useApplyMetafieldsChange,
  useExtensionCapability,
  useBuyerJourneyIntercept,
  useMetafield,
  reactExtension,
  useApi,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const { extension } = useApi();

  const p_iva = useMetafield({
    namespace: "custom",
    key: "p_iva"
  });
  
  const setPivaMet = useApplyMetafieldsChange();

  const ragionale = useMetafield({
    namespace: 'custom',
    key: 'ragione_sociale'
  });
  
  const setRagionale = useApplyMetafieldsChange();

  const codice_fiscale = useMetafield({
    namespace: 'custom',
    key: 'codice_fiscale'
  });
  
  const setCodiceFiscale = useApplyMetafieldsChange();
  
  const pecEmail = useMetafield({
    namespace: "custom",
    key: "pec_email"
  });
  
  const setpecEmail = useApplyMetafieldsChange();

  const sdiCode = useMetafield({
    namespace: "custom",
    key: "sdi_code"
  });

  const setsdiCode = useApplyMetafieldsChange();

  const [ragSoc, setRs] = useState("");
  const [pIva, setpIva] = useState("");
  const [pec, setPec] = useState("");
  const [codSDI, setSdi] = useState("");
  const [fiscale, setFiscale] = useState("");

  const [ragSocValidationError, setRagSocValidationError] = useState("");
  const [pecValidationError, setPecValidationError] = useState("");
  const [pIvaValidationError, setpIvaValidationError] = useState("");
  const [sdiValidationError, setSdiValidationError] = useState("");
  const [fiscaleValidationError, setFiscaleValidationError] = useState("");
  
  const canBlockProgress = useExtensionCapability("block_progress");
  const rsLabel = canBlockProgress ? "Ragione Sociale" : "Ragione Sociale*";
  const pecLabel = canBlockProgress ? "PEC" : "PEC*";
  const pvLabel = canBlockProgress ? "P.IVA" : "P.IVA*";
  const sdiLabel = canBlockProgress ? "Codice SDI" : "Codice SDI*";
  const fiscaleLabel = canBlockProgress ? "Codice Fiscale" : "Codice Fiscale (obbligatorio per ditte individuali)*";

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !isRset()) {
      return {
        behavior: "block",
        reason: "Ragione Sociale is required",
        perform: (result) => {
          if (result.behavior === "block") {
            setRagSocValidationError("Inserisci la tua Ragione Sociale");
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearRagSocValidationError();
      },
    };
  });

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !ispIvaset()) {
      return {
        behavior: "block",
        reason: "P.IVA is required",
        perform: (result) => {
          if (result.behavior === "block") {
            setpIvaValidationError("Inserisci la tua P.IVA");
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearpIvaValidationError();
      },
    };
  });

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !isPECset()) {
      return {
        behavior: "block",
        reason: "PEC is required",
        perform: (result) => {
          if (result.behavior === "block") {
            setPecValidationError("L'indirizzo email fornito non è valido.");
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearPecValidationError();
      },
    };
  });

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !issetSdi()) {
      return {
        behavior: "block",
        reason: "Codice SDI is required",
        perform: (result) => {
          if (result.behavior === "block") {
            setSdiValidationError("Il codice SDI deve essere di 7 caratteri.");
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearSdiValidationError();
      },
    };
  });

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !isFiscale()) {
      return {
        behavior: "block",
        reason: "Codice Fiscale is required",
        perform: (result) => {
          if (result.behavior === "block") {
            setFiscaleValidationError("Il Codice Fiscale deve essere di 16 caratteri.");
          }
        },
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        clearFiscaleValidationError();
      },
    };
  });

  function issetSdi() {
    const regex = /^[A-Z0-9]{1,7}$/;
    return codSDI !== "" && regex.test(codSDI);
  }

  function isRset() {
    return ragSoc !== "";
  }

  function ispIvaset() {
    return pIva !== "";
  }

  function isPECset() {
    return pec !== "" && pec.trim() !== '' && pec.includes('@');
  }

  function isFiscale() {
    const regex = /^[A-Z0-9]{16}$/;
    return  fiscale !== "" && regex.test(fiscale);
  }

  function clearPecValidationError() {
    setPecValidationError("");
  }

  function clearpIvaValidationError() {
    setpIvaValidationError("");
  }

  function clearSdiValidationError() {
    setSdiValidationError("");
  }

  function clearFiscaleValidationError() {
    setFiscaleValidationError("");
  }

  function clearRagSocValidationError() {
    setRagSocValidationError("");
  }

  return (
  <>
    <Form
        onSubmit={() =>
          console.log('onSubmit event')
        }
      >
        <Grid columns={['fill']} spacing="base">
          <View>
            <TextField
            label={rsLabel}
            onInput={clearRagSocValidationError} 
            value={ragSoc}
            required={canBlockProgress}
            error={ragSocValidationError}
            onChange={ (value)=> {
              setRs(value)
              setRagionale({
                type: "updateMetafield",
                namespace: "custom",
                key: "ragione_sociale",
                valueType: "string",
                value,
              });
            }} />
          </View>
          <View>
            <TextField
            label={pvLabel}
            onInput={clearpIvaValidationError} 
            value={pIva}
            required={canBlockProgress}
            error={pIvaValidationError}
            onChange={ (value)=> {
              setpIva(value)
              setPivaMet({
                type: "updateMetafield",
                namespace: "custom",
                key: "p_iva",
                valueType: "string",
                value,
              });
            }} />
          </View>
          <View>
            <TextField
            maxlength="7"
            label={fiscaleLabel}
            required={canBlockProgress}
            onInput={clearFiscaleValidationError} 
            value={fiscale}
            error={fiscaleValidationError}
            onChange={ (value)=> {
              setFiscale(value)
              setCodiceFiscale({
                type: "updateMetafield",
                namespace: "custom",
                key: "codice_fiscale",
                valueType: "string",
                value,
              })
            }} />
          </View>
          <View>
            <TextField
            maxlength="7"
            label={sdiLabel}
            required={canBlockProgress}
            onInput={clearSdiValidationError} 
            value={codSDI}
            error={sdiValidationError}
            onChange={ (value)=> {
              setSdi(value)
              setsdiCode({
                type: "updateMetafield",
                namespace: "custom",
                key: "sdi_code",
                valueType: "string",
                value,
              })
            }} />
          </View>
          <View>
            <TextField label={pecLabel} name="pec_email" type="email" 
            onInput={clearPecValidationError} 
            value={pec}
            required={canBlockProgress}
            error={pecValidationError}
            onChange={ (value)=> {
              setPec(value)
              setpecEmail({
                type: "updateMetafield",
                namespace: "custom",
                key: "pec_email",
                valueType: "string",
                value,
              })
            }} />
          </View>
        </Grid>
    </Form>
  </>
  );
}