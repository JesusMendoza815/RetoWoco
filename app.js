import {
    onGetVisits,
    saveVisit,
    deleteVisit,
    getVisit,
    updateVisit
 } from "./Models/db.js";
const d = document;

const form = d.querySelector('#form');
const visitsContainer = d.querySelector('#contenedorVisitas');


let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async (e) => {
    onGetVisits((querySnapshot) => {
        visitsContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const visit = doc.data();
            console.log(visit);

            visitsContainer.innerHTML += `
            <tr class="table-secondary">
                <th>Empresa</th>
                <th>Usuarios Autorizados</th>
                <th>Hora de llegada prevista</th>
                <th>Hora de llegada</th>
                <th>Hora de salida</th>
                <th>Equipo ingresado</th>
                <th>EPP entregado</th>
                <th>Autorizó</th>
            </tr>
            <tr>
                <td>${visit.empresa}</td>
                <td>${visit.visitors}</td>
                <td>${visit.previstTime}</td>
                <td>${visit.arriveTime}</td>
                <td>${visit.leaveTime}</td>
                <td>${visit.equipment}</td>
                <td>${visit.epp}</td>
                <td>${visit.whoAutorized}</td>
                <button data-id='${doc.id}' class="btn btn-danger btn-delete m-2">Borrar</button>
                <button data-id='${doc.id}' class="btn btn-warning btn-edit m-2">Editar</button>
            </tr>
            `;

        });

        const btnsDelete = visitsContainer.querySelectorAll('.btn-delete');
        btnsDelete.forEach((btn)=> {
            btn.addEventListener('click', async ({ target: { dataset }}) => {
                try {
                    console.log(dataset.id);
                    await deleteVisit(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        });

        const btnsEdit = visitsContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btnE) => {
        btnE.addEventListener("click", async (e) => {
        try {
          const doc = await getVisit(e.target.dataset.id);
          const visit = doc.data();
          console.log(visit);
          
          form["inputHoraLlegada"].value = visit.arriveTime;
          form["inputHoraSalida"].value = visit.leaveTime;

          editStatus = true;
          id = doc.id;
          form["btnCrear"].innerText = "Update";
        } catch (error) {
          return error;
        }


      });
    });

    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const empresa = form["inputEmpresa"];
    const users = form["inputUsuarios"];
    const previstTime = form["inputHoraEsperada"];
    const arriveTime = form["inputHoraLlegada"];
    const leaveTime = form["inputHoraSalida"];
    const equipment = form["inputEquipo"];
    const epp = form["inputEpp"];
    const autorize = form["inputAutoriza"];

    try {
        if (!editStatus) {
            await saveVisit(empresa.value, users.value, previstTime.value,arriveTime.value,leaveTime.value, equipment.value, epp.value, autorize.value);
        } else {
            await updateVisit(id, {
                arriveTime: arriveTime.value, 
                leaveTime: leaveTime.value
            });

            console.log('editing');
            editStatus = false;
            id = '';
            form['btnCrear'].textContent = 'Crear';
        }

        form.reset();
    } catch (error) {
        console.log(error);
    }

})