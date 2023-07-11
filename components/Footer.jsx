// Library Imports
import { Text } from "@nextui-org/react";

export function Copyright({year, name}) {
  return (
    <Text size="$sm">
      Copyright © {year} {name}
    </Text>
  )
}