export interface PosicionFutbol {
  nombre: string;
  posicion: string;
}

export interface ResponseFutbolista {
  status: boolean;
  result: Futbolista[];
}

export interface ResponseShowFutbolista {
  status: boolean;
  result: Futbolista;
  errors?: Error[];
}

export interface Futbolista {
  imagen:       string;
  nombre:       string;
  posicion:     string;
  usuario:      string;
  apodo:        string;
  equipos:      string;
  nacionalidad: string;
  uid:          string;
}


export interface Error {
  type:     string;
  value:    string;
  msg:      string;
  path:     string;
  location: string;
}


export interface ResponseSaveFutbolista {
  status:  boolean;
  message: string;
  result:  Futbolista;
  errors?: Error[];
}
