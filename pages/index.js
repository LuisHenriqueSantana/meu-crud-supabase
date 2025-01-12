import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')

      if (error) console.error('Erro ao buscar produtos:', error)
      else setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
