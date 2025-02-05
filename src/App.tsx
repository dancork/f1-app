import { Container, Flex } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import { AllTheProviders } from './AllTheProviders'
import { GrandPrixSelect } from './components/GrandPrixSelect'
import { GrandPrixResult } from './components/GrandPrixResult'
import { GrandPrixHeader } from './components/GrandPrixHeader'
import { YearSelect } from './components/YearSelect'

export const App = () => (
  <AllTheProviders>
    <Container size="1">
      <Flex direction="column" p="5" gap="6">
        <Flex gap="6" asChild>
          <header>
            <YearSelect />
            <GrandPrixSelect />
          </header>
        </Flex>
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
