export interface Mision {
  disponibles: Disponible[];
  enCurso: EnCurso[];
}

export interface EnCurso {
  id: number;
  img: string;
  prize: string;
  status: string;
  time: string;
  titleCircle: string;
  subTitleCircle: string;
  colorCircle: string;
  colorTextCircle: string;
  percentCircle: number;
  imgCircle: string;
}
export interface Disponible {
  id: number;
  img: string;
  title: string;
  subTitle: string;
  descripcion: string;
}
export const misionMock: Mision = {
  disponibles: [
    {
      id: 1,
      img:
        "https://media-exp1.licdn.com/dms/image/C4D0BAQGmL7qx_nikIg/company-logo_200_200/0/1602716010568?e=2159024400&v=beta&t=EbRH3GXNdbFqpnU1l4QJwsCUzhZa1yPg58zZRVo6jNI",
      title: "¡Gana $10.000 S pesos!",
      subTitle:
        "Compra en Rappi 4 días a la semana y obten de regalo $10.000 S pesos",
      descripcion: "",
    },
    {
      id: 1,
      img:
        "https://yt3.ggpht.com/ytc/AAUvwniM4MK5Ds7Z2kRzA88XXWTQONDxkutzM173Jm4g=s900-c-k-c0x00ffffff-no-rj",
      title: "Obten 1 Envío gratis",
      subTitle:
        "Por tu segunda compra en mall del parrillero obten 1 envío gratis",
      descripcion: "",
    },
    {
      id: 1,
      img:
        "https://cdn.shopify.com/s/files/1/0178/9929/0678/files/Feroz_Logo_Header_612x.png?v=1568320303",
      title: "Oferta Flash",
      subTitle:
        "Compra antes de las 00:00 de hoy por nuestra web y paga solo la mitad",
      descripcion: "",
    },
  ],
  enCurso: [
    {
      id: 100,
      img:
        "https://media-exp1.licdn.com/dms/image/C4D0BAQGmL7qx_nikIg/company-logo_200_200/0/1602716010568?e=2159024400&v=beta&t=EbRH3GXNdbFqpnU1l4QJwsCUzhZa1yPg58zZRVo6jNI",
      prize: "Premio $10.000 S pesos!",
      status: "2 de 4 días",
      time: "5 días para que termine la misíon",
      titleCircle: "Días",
      subTitleCircle: "2/4",
      colorCircle: "#4449F0",
      colorTextCircle: "#4449F0",
      percentCircle: 50,
      imgCircle: "",
    },
    {
      id: 100,
      img:
        "https://yt3.ggpht.com/ytc/AAUvwniM4MK5Ds7Z2kRzA88XXWTQONDxkutzM173Jm4g=s900-c-k-c0x00ffffff-no-rj",
      prize: "Premio 1 Envío gratis",
      status: "Una compra",
      time: "Sin tiempo",
      titleCircle: "Compras",
      subTitleCircle: "1/2",
      colorCircle: "#20DEB0",
      colorTextCircle: "#4449F0",
      percentCircle: 10,
      imgCircle: "",
    },
    {
      id: 100,
      img:
        "https://cdn.shopify.com/s/files/1/0178/9929/0678/files/Feroz_Logo_Header_612x.png?v=1568320303",
      prize: "Premio 1 Envío gratis",
      status: "Sin compra",
      time: "Termina hoy a las 00:00",
      titleCircle: "Tiempo",
      subTitleCircle: "22:12",
      colorCircle: "#ED0722",
      colorTextCircle: "#4449F0",
      percentCircle: 90,
      imgCircle: "",
    },
  ],
};
