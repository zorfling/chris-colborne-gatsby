// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
import { datadogRum } from '@datadog/browser-rum';

const onInitialClientRender = () => {
  datadogRum.init({
    applicationId: 'deac7fc4-3823-4606-9f19-78fd94b06a82',
    clientToken: 'pub463d9d377050aa7d3da73af2dcb1daa0',
    site: 'datadoghq.eu',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
  });
};

export { onInitialClientRender };
