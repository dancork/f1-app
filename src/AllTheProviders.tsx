import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'

const queryClient = new QueryClient()

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <QueryClientProvider client={queryClient}>
    <Theme
      accentColor="pink"
      grayColor="mauve"
      radius="large"
      appearance="dark"
    >
      {children}
    </Theme>
  </QueryClientProvider>
)
