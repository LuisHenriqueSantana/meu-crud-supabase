import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PUT') {
    // Lógica para atualizar um produto
    const { name, price, description } = req.body
    const { data, error } = await supabase
      .from('products')
      .update({ name, price, description })
      .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.status(200).json(data)
  } else if (req.method === 'DELETE') {
    // Lógica para deletar um produto
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })

    res.status(204).end()
  } else {
    // Método não permitido
    res.status(405).json({ message: 'Método não permitido' })
  }
}
