type Hufiec = {
    hufiec: string
    druzyna: Druzyna[]
}

type Druzyna = {
    name: string,
    location: string
    harcerze: Harcerz[]
}

type Harcerz = {
    firstName: string,
    lastName: string,
    insDegree: InsK | InsM,
    scoutDegree: HarK | HarM,
    skladki: Skladki[],
    sprawnosci: string[]
}

type Skladki = {
    data: string,
    price: number
}

 enum HarM {
    mlodzik = "Młodzik",
    wywiadowca = "Wywiadowca",
    cwik = "Ćwik",
    ho = "Harcerz Orli",
    hr = "Harcerz Rzeczypospolitej"
 }

 
 enum HarK {
    mlodzik = "Ochotniczka",
    wywiadowca = "Tropicielka",
    cwik = "Samarytanka",
    ho = "Wędrowniczka",
    hr = "Harcerka Rzeczypospolitej"
 }
 
 enum InsM {
    pwd = "Przewodnik",
    phm = "Podharcmistrz",
    hm = "Harcmistrz"
 }

 enum InsK {
    pwd = "Przewodniczka",
    phm = "Podharcmistrzyni",
    hm = "Harcmistrzyni"
 }
 
export { Hufiec, Druzyna, Harcerz, InsK, InsM, HarK, HarM};