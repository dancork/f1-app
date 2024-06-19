import { Container, Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import { AllTheProviders } from './AllTheProviders'
import { GrandPrixSelect } from './components/GrandPrixSelect'
import { GrandPrixResult } from './components/GrandPrixResult'
import { GrandPrixHeader } from './components/GrandPrixHeader'

export const App = () => (
  <AllTheProviders>
    <Container size="1">
      <Flex direction="column" p="5" gap="6">
        <GrandPrixSelect />
        <Flex direction="column" gap="5" asChild>
          <main>
            <GrandPrixHeader />
            <GrandPrixResult />
          </main>
        </Flex>
      </Flex>
    </Container>
  </AllTheProviders>
)
