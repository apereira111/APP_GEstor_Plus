// data/ubsApiMock.ts

/**
 * Interface representing a single Unidade Básica de Saúde (UBS)
 * based on the real structure from apidadosabertos.saude.gov.br
 */
export interface UbsData {
    codCnes: string;
    nomeFantasia: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    telefone?: string;
    lat: number;
    long: number;
}

/**
 * A mock response simulating a successful API call to fetch UBS data.
 * This data is structured exactly like the real API response.
 */
export const ubsApiMockResponse: UbsData[] = [
    {
        codCnes: "2027154",
        nomeFantasia: "UBS VILA PRUDENTE",
        logradouro: "PRACA CENTENARIO DE VILA PRUDENTE",
        bairro: "VILA PRUDENTE",
        cidade: "SAO PAULO",
        uf: "SP",
        cep: "03132050",
        telefone: "1123456789",
        lat: -23.57864,
        long: -46.57715,
    },
    {
        codCnes: "2027880",
        nomeFantasia: "UBS JARDIM GRIMALDI",
        logradouro: "RUA HIPOLITO DE CAMARGO",
        bairro: "VILA PRUDENTE",
        cidade: "SAO PAULO",
        uf: "SP",
        cep: "03221000",
        telefone: "1198765432",
        lat: -23.59365,
        long: -46.54129,
    },
    {
        codCnes: "2079140",
        nomeFantasia: "UBS JARDIM GUANABARA",
        logradouro: "RUA ARLINDO MARCHI",
        bairro: "JARDIM GUANABARA",
        cidade: "CAMPINAS",
        uf: "SP",
        cep: "13073330",
        telefone: "1932112233",
        lat: -22.8841,
        long: -47.0783,
    },
    {
        codCnes: "2082265",
        nomeFantasia: "CS VILA IPA",
        logradouro: "RUA SYLVINO DE GODOY",
        bairro: "VILA IPA",
        cidade: "CAMPINAS",
        uf: "SP",
        cep: "13054105",
        // This entry intentionally has no phone number for KPI calculation
        telefone: undefined,
        lat: -22.9567,
        long: -47.1182,
    },
    {
        codCnes: "2087534",
        nomeFantasia: "CENTRO DE SAUDE VILA EMBRIDE",
        logradouro: "RUA DEPUTADO LAERCIO CORTE",
        bairro: "JARDIM SANTA MONICA",
        cidade: "CAMPINAS",
        uf: "SP",
        cep: "13082100",
        telefone: "1933445566",
        lat: -22.8465,
        long: -47.1263,
    },
     {
        codCnes: "2024473",
        nomeFantasia: "UBS JARDIM SAO PAULO",
        logradouro: "RUA JOSE CLEMENTE",
        bairro: "JARDIM SAO PAULO",
        cidade: "SAO PAULO",
        uf: "SP",
        cep: "02041040",
        telefone: "1129778899",
        lat: -23.498,
        long: -46.626,
    },
     {
        codCnes: "3003050",
        nomeFantasia: "UBS VILA MADALENA",
        logradouro: "RUA PURPURINA",
        bairro: "VILA MADALENA",
        cidade: "SAO PAULO",
        uf: "SP",
        cep: "05435030",
        telefone: "1130312233",
        lat: -23.551,
        long: -46.698,
    },
];
