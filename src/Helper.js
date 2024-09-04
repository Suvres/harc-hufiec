const createDruzyna = (key, value, druz) => {
      const d = document.createElement("div")
      d.classList.add(`druz${druz}`)
      
      for (let i = 0; i < (value.harcerze ?? []).length; i++) {
        d.appendChild(createHarc(value.harcerze[i], "harcerze", i, `druzyna[${druz}]`, druz)) 
      }
    
      return d;
    }
    
const createHarc = (harc, key, i, druzyna, druzInd) => {
      console.log(harc,key, i, druzyna)
      const d = document.createElement("div")
      d.classList.add("m-1", "d-flex", "w-100", "form-row")
      d.style.alignItems = "center"
      d.classList.add(`druzyna-${druzInd}-harcerz-${i}`)
    
      const dd = document.createElement("div")
      dd.classList.add("form-group", "col-3", "m-1")
    
      const l1 = document.createElement("label")
      l1.innerText = "Imię"
    
      const i1 = document.createElement("input")
      i1.type = "text"
      i1.classList.add("form-control")
      i1.value = harc.firstName
      i1.name = `${druzyna}.${key}[${i}].firstName`
    
      dd.appendChild(l1);
      dd.appendChild(i1);
      
      const dd2 = document.createElement("div")
      dd2.classList.add("form-group", "col-3", "m-1")
    
      const l2 = document.createElement("label")
      l2.innerText = "Nazwisko"
    
      const i2 = document.createElement("input")
      i2.type = "text"
      i2.classList.add("form-control")
      i2.value = harc.lastName
      i2.name = `${druzyna}.${key}[${i}].lastName`
    
      dd2.appendChild(l2);
      dd2.appendChild(i2);
    
      const dd3 = document.createElement("div")
      dd3.classList.add("form-group", "col-2", "m-1")
    
      const l3 = document.createElement("label")
      l3.innerText = "Stopień Harcerski"
    
      const i3 = document.createElement("select")
      i3.classList.add("form-control")
      i3.name = `${druzyna}.${key}[${i}].scoutDegree`
      console.log(harc);
      dd3.appendChild(l3);
      dd3.appendChild(i3);
    
      const dd4 = document.createElement("div")
      dd4.classList.add("form-group", "col-2", "m-1")
    
      const l4 = document.createElement("label")
      l4.innerText = "Stopień Instruktorski"
    
      const i4 = document.createElement("select")
      i4.classList.add("form-control")
      i4.name = `${druzyna}.${key}[${i}].insDegree`
      const kkk = [null, 'pwd', 'phm', 'hm'];
      
      for(let i = 0; i < kkk.length; i++) {
        const o = document.createElement("option")
        o.value = i
        o.innerHTML = kkk[i] ?? null
        i4.appendChild(o)
      }
      
      i4.value = harc.insDegree ?? null
      
      const ins = [null, 
      "Młodzik",
      "Wywiadowca",
      "Ćwik",
      "Harcerz Orli",
      "Harcerz Rzeczypospolitej",
      "Ochotniczka",
      "Tropicielka",
      "Samarytanka",
      "Wędrowniczka",
      "Harcerka Rzeczypospolitej"]

      for(let i = 0; i < ins.length; i++) {
        const o = document.createElement("option")
        o.value = i
        o.innerHTML = ins[i] ?? null
        i3.appendChild(o)
      }
      i3.value = harc.scoutDegree ?? null
      
      dd4.appendChild(l4);
      dd4.appendChild(i4);

      const dex = document.createElement("div")
      dex.classList.add("m-1", "badge", "bg-danger", "text-center", "align-middle", "huf-remove")
      dex.innerText = `X`
      dex.style.height = "24px"
      dex.style.width = "24px"
      dex.style.alignContent = "center"
      dex.addEventListener("click", () => document.querySelector(`.druzyna-${druzInd}-harcerz-${i}`).remove())
    
      d.appendChild(dd);
      d.appendChild(dd2);
      d.appendChild(dd3);
      d.appendChild(dd4);
      d.appendChild(dex);
      return d;
    } 
  
  const createhufiec = (hufiec, druz, key, i) => {
    
      const dd = document.createElement("div")
      dd.classList.add("border-bottom", "w-100")
    
      const d = document.createElement("div")
      d.classList.add("form-group", "m-1", "d-flex")
      d.style.alignItems = "center"
      d.classList.add(`druzyna-${i}`)
      
      
      const din = document.createElement("div")
      din.classList.add("m-1", "badge", "bg-primary", "text-center")
      din.innerHTML = `&#9660;`
      din.style.height = "24px"
      din.style.width = "24px"
      din.style.lineHeight = "12px"
      din.style.fontSize = "12px"
      din.style.alignContent = "center"
    
      const dex = document.createElement("div")
      dex.classList.add("m-1", "badge", "bg-danger", "text-center", "align-middle", "huf-remove")
      dex.innerText = `X`
      dex.style.height = "24px"
      dex.style.width = "24px"
      dex.style.alignContent = "center"
      dex.addEventListener("click", () => document.querySelector(`.druzyna-${i}`).remove())
    
      const d1 = document.createElement("div")
      d1.style.flex = "auto"
      d1.classList.add("form-group", "m-1")
      
      const d2 = document.createElement("div")
      d2.classList.add("form-group", "m-1")
      d2.style.flex = "auto"
    
      const l1 = document.createElement("label")
      l1.innerText = "Nazwa drużyny"
    
      const i1 = document.createElement("input")
      i1.type = "text"
      i1.classList.add("form-control")
      i1.value = druz.name
      i1.name = `${key}[${i}].name`
      
      d1.appendChild(l1)
      d1.appendChild(i1)
      
      const l2 = document.createElement("label")
      l2.innerText = "Lokalizacja"
    
      const i2 = document.createElement("input")
      i2.type = "text"
      i2.classList.add("form-control")
      i2.value = druz.location
      i2.name = `${key}[${i}].location`
    
      d2.appendChild(l2)
      d2.appendChild(i2)
      
      d.appendChild(din)
      d.appendChild(d1)
      d.appendChild(d2)
      d.appendChild(dex)

      const dplus = document.createElement("div")
      dplus.classList.add("m-1", "badge", "bg-success", "text-center", "align-middle", "huf-remove")
      dplus.innerText = `+`
      dplus.style.height = "24px"
      dplus.style.width = "24px"
      dplus.style.alignContent = "center"
      dplus.classList.add("harc-add")
      dplus.dataset.d=i
      dplus.dataset.v=(druz.harcerze ?? []).length
      dplus.addEventListener("click", (e) => createHarcInHufiec(e))
      d.appendChild(dplus)
      d.classList.add("druzyna")
    
      dd.appendChild(d)
      dd.appendChild(createDruzyna("harcerze", druz, i))
      
      hufiec.appendChild(dd)
      console.log(hufiec)
    
    }

const createHarcInHufiec = (e) => {
  var d = e.currentTarget.dataset.d
  var v = e.currentTarget.dataset.v
  console.log(d, v)
  document.querySelector(`.druz${d}`).appendChild(createHarc({firstName: null, lastName: null}, "harcerze", v, `druzyna[${d}]`, d))        
}

export {
    createhufiec
}
