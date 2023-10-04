import {
  Grid,
  View,
  Text,
  BlockLayout,
  useMetafield,
  useApi,
  useTranslate,
  reactExtension,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  const p_iva = useMetafield({
    namespace: "custom",
    key: "p_iva"
  });

  const pecEmail = useMetafield({
    namespace: 'custom',
    key: 'pec_email'
  });

  const sdiCode = useMetafield({
    namespace: 'custom',
    key: 'sdi_code'
  });

  if (!ragionale?.value || !sdiCode?.value) {
    return null; // If any value is null, do not render the component
  }
  
  return (
    <BlockLayout border="base" cornerRadius="base" padding="base">
      <Grid columns={['auto', 'fill']} spacing={['none', 'base']}>
        {p_iva?.value && (
          <>
            <View padding="none">
              <Text size="base">P.IVA</Text>
            </View>
            <View padding="none">
              <Text size="base">{p_iva.value}</Text>
            </View>
          </>
        )}

        {sdiCode?.value && (
          <>
            <View padding="none">
              <Text size="base">Codice SDI</Text>
            </View>
            <View padding="none">
              <Text size="base">{sdiCode.value}</Text>
            </View>
          </>
        )}

        {pecEmail?.value && (
          <>
            <View padding="none">
              <Text size="base">PEC</Text>
            </View>
            <View padding="none">
              <Text size="base">{pecEmail.value}</Text>
            </View>
          </>
        )}
      </Grid>
    </BlockLayout>
  );
}