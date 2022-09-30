import { useAtom } from 'jotai'
import itemAtom from '../atoms/items'

export default function useItems () {
  const [items, setItems] = useAtom(itemAtom)

  return {items, setItems}
}
