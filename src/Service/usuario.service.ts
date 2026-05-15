import UsuarioRepository from "../models/usuarios.model";

interface CreateUsuarioDTO {
  idColaborador?: number | null;
  nome: string;
  email: string;
  senha: string;
}

export class CreateUsuarioService {
  async create(data: CreateUsuarioDTO) {
    if (!data.nome) {
      throw new Error("É necessário adicionar o nome do usuário");
    }

    if (!data.email) {
      throw new Error("É necessário adicionar o e-mail do usuário");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("O e-mail informado é inválido");
    }

    if (!data.senha) {
      throw new Error("É necessário adicionar uma senha para o usuário");
    }

    if (data.senha.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres");
    }

    const emailExistente = await UsuarioRepository.findOne({
      where: { email: data.email },
    });

    if (emailExistente) {
      throw new Error("Já existe um usuário cadastrado com este e-mail");
    }

    const usuario = await UsuarioRepository.create({
      idColaborador: data.idColaborador ?? null,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    });

    return usuario;
  }
}