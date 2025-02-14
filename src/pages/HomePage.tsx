import { Container, Title, Text, Button, Stack } from '@mantine/core';
import {
  FHIR_SCOPE,
  IEHR_AUTH_URL,
  IEHR_CLIENT_ID,
  SMART_HEALTH_IT_AUTH_URL,
  SMART_HEALTH_IT_CLIENT_ID,
} from '../config';

interface SmartLaunchProps {
  clientId: string;
  iss: string;
  children: React.ReactNode;
}

function SmartLaunch({ clientId, iss, children }: SmartLaunchProps): JSX.Element {
  const handleClick = (): void => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: FHIR_SCOPE,
      redirect_uri: window.location.origin + '/launch',
      state: crypto.randomUUID(),
      aud: iss,
    });

    window.location.href = `${iss}?${params.toString()}`;
  };

  return <div onClick={handleClick}>{children}</div>;
}

export function HomePage(): JSX.Element {
  return (
    <Container size="md" mt="xl">
      <Stack>
        <Title order={1}>iEHR SMART on FHIR Demo</Title>
        <Text>
          This is a demonstration of SMART on FHIR capabilities using iEHR. You can launch this app from any
          SMART-enabled EHR system.
        </Text>
        <Text>To test the app, you can use one of these launch options:</Text>

        <SmartLaunch clientId={IEHR_CLIENT_ID} iss={IEHR_AUTH_URL}>
          <Button>Launch with iEHR</Button>
        </SmartLaunch>

        <SmartLaunch clientId={SMART_HEALTH_IT_CLIENT_ID} iss={SMART_HEALTH_IT_AUTH_URL}>
          <Button>Launch with SMART Health IT Sandbox</Button>
        </SmartLaunch>
      </Stack>
    </Container>
  );
}
