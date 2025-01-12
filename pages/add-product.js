import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Verificando se todos os campos estão preenchidos
    if (!name || !price || !description) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    // Enviar dados para a API do Supabase
    const { error } = await supabase
      .from('products')
      .insert([
        {
          name,
          price: parseFloat(price),
          description,
        },
      ])

    if (error) {
      alert('Erro ao adicionar o produto: ' + error.message)
    } else {
      // Após a inserção, redireciona para a lista de produtos
      router.push('/')
    }
  }

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome do Produto</label>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  )
}
