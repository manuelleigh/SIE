

    /* ==========================================================
       VARIABLES PRINCIPALES
    ========================================================== */

    let incidents = [];

    let incidentCounter = 0;

    let riskChart = null;


    /* ==========================================================
       ELEMENTOS DOM
    ========================================================== */

    const form =
        document.getElementById("riskForm");

    const previewRisk =
        document.getElementById("previewRisk");

    const previewLevel =
        document.getElementById("previewLevel");

    const historyBody =
        document.getElementById("historyBody");

    const parallelContainer =
        document.getElementById("parallelContainer");

    const processResult =
        document.getElementById("processResult");


    const nodes = {

        start:
            document.getElementById("nodeStart"),

        evaluation:
            document.getElementById("nodeEvaluation"),

        xor:
            document.getElementById("nodeXor"),

        maintenance:
            document.getElementById("nodeMaintenance"),

        devops:
            document.getElementById("nodeDevOps"),

        ciso:
            document.getElementById("nodeCiso"),

        end:
            document.getElementById("nodeEnd")

    };


    /* ==========================================================
       DETERMINAR SEVERIDAD
    ========================================================== */

    function getSeverity(risk) {

        if (risk >= 16) {

            return {
                name: "Muy grave",
                className: "badge-red",
                color: "#ef4444"
            };

        }

        if (risk >= 9) {

            return {
                name: "Importante",
                className: "badge-orange",
                color: "#f97316"
            };

        }

        if (risk >= 4) {

            return {
                name: "Apreciable",
                className: "badge-yellow",
                color: "#eab308"
            };

        }

        return {
            name: "Marginal",
            className: "badge-green",
            color: "#22c55e"
        };

    }


    /* ==========================================================
       GENERAR DIAGNÓSTICO
    ========================================================== */

    function generateFeedback(
        incidentName,
        type,
        probability,
        impact,
        risk
    ) {

        let problem = "";
        let feedback = "";
        let solution = "";
        let action = "";
        let responsible = "";
        let priority = "";
        let justification = "";


        /* ======================================================
           CASO CRÍTICO
        ====================================================== */

        if (risk >= 16) {

            priority = "CRÍTICA";

            action =
                "Activar inmediatamente el proceso de emergencia, contener el incidente y realizar seguimiento continuo hasta su mitigación.";

            responsible =
                "Equipo DevOps y Oficial CISO.";

            justification =
                `El valor obtenido (${risk}) es igual o superior a 16. Por la regla de decisión XOR, el proceso se desvía hacia Atención de Emergencia Crítica. Posteriormente se ejecutan dos actividades paralelas mediante la compuerta AND.`;


            if (type === "Lógico") {

                problem =
                    `El incidente "${incidentName}" corresponde a un riesgo lógico con una combinación elevada de probabilidad (${probability}) e impacto (${impact}). Puede comprometer servicios, aplicaciones, datos o infraestructura lógica.`;

                feedback =
                    "El sistema identifica una situación que requiere respuesta inmediata debido a la posibilidad de afectar la continuidad o seguridad de los servicios TI.";

                solution =
                    "Aislar los servicios o equipos afectados, revisar conexiones y registros, bloquear accesos o puertos comprometidos, verificar integridad de los sistemas y realizar una evaluación de seguridad antes de restablecer completamente el servicio.";

            }

            else if (type === "Físico") {

                problem =
                    `El incidente "${incidentName}" representa un riesgo físico con probabilidad ${probability} e impacto ${impact}, pudiendo afectar infraestructura o disponibilidad de los servicios TI.`;

                feedback =
                    "La combinación de probabilidad e impacto requiere una respuesta prioritaria para evitar una interrupción mayor de la infraestructura tecnológica.";

                solution =
                    "Aislar el área o equipo afectado, proteger la infraestructura crítica, verificar alimentación eléctrica, temperatura, conectividad y condiciones físicas, y activar medidas de contingencia.";

            }

            else {

                problem =
                    `El incidente "${incidentName}" corresponde a un riesgo humano con probabilidad ${probability} e impacto ${impact}. El comportamiento o error involucrado podría afectar los servicios o la seguridad de la información.`;

                feedback =
                    "La evaluación indica que el factor humano requiere intervención inmediata para reducir la posibilidad de una afectación mayor.";

                solution =
                    "Contener la acción que originó el incidente, revisar permisos y accesos, registrar lo ocurrido y realizar una comunicación inmediata al personal involucrado para evitar recurrencias.";

            }

        }


        /* ======================================================
           IMPORTANTE
        ====================================================== */

        else if (risk >= 9) {

            priority = "ALTA";

            action =
                "Programar atención prioritaria y realizar seguimiento mediante los mecanismos de gestión y monitoreo establecidos.";

            responsible =
                "Mesa de ayuda / equipo de TI responsable del servicio.";

            justification =
                `El valor obtenido (${risk}) se encuentra entre 9 y 15. El sistema no activa la emergencia crítica, por lo que el flujo se dirige a Mantenimiento Programado / Monitoreo SLA.`;


            if (type === "Lógico") {

                problem =
                    `Se detectó un riesgo lógico de nivel importante asociado al incidente "${incidentName}".`;

                feedback =
                    "Aunque no alcanza el umbral de emergencia, el riesgo debe ser atendido para evitar que aumente su impacto o frecuencia.";

                solution =
                    "Revisar la configuración del servicio, aplicar correcciones o actualizaciones necesarias, monitorear el comportamiento y documentar las acciones realizadas.";

            }

            else if (type === "Físico") {

                problem =
                    `Se identificó una condición física que puede afectar la disponibilidad de los servicios TI.`;

                feedback =
                    "La infraestructura debe ser revisada antes de que la condición pueda provocar una interrupción.";

                solution =
                    "Realizar mantenimiento preventivo, inspeccionar los componentes afectados y establecer controles para evitar la repetición del problema.";

            }

            else {

                problem =
                    `Se identificó un riesgo humano que puede generar incidentes recurrentes.`;

                feedback =
                    "El factor humano debe ser controlado mediante seguimiento y acciones preventivas.";

                solution =
                    "Reforzar procedimientos, capacitar al personal y verificar el cumplimiento de las políticas internas.";

            }

        }


        /* ======================================================
           APRECIABLE
        ====================================================== */

        else if (risk >= 4) {

            priority = "MEDIA";

            action =
                "Registrar el incidente y atenderlo dentro del mantenimiento programado, manteniendo monitoreo del comportamiento.";

            responsible =
                "Mesa de ayuda / responsable del servicio.";

            justification =
                `El valor obtenido (${risk}) está entre 4 y 8. La regla XOR dirige el incidente hacia mantenimiento programado y monitoreo SLA.`;


            problem =
                `El incidente "${incidentName}" presenta un riesgo apreciable con probabilidad ${probability} e impacto ${impact}.`;

            feedback =
                "El riesgo no requiere una respuesta de emergencia, pero debe permanecer registrado y bajo seguimiento para evitar que evolucione a una condición más severa.";

            solution =
                "Programar una acción preventiva o correctiva, monitorear el incidente y verificar posteriormente si el nivel de riesgo disminuyó.";

        }


        /* ======================================================
           MARGINAL
        ====================================================== */

        else {

            priority = "BAJA";

            action =
                "Registrar el incidente, mantener monitoreo básico y atenderlo durante las actividades normales de mantenimiento.";

            responsible =
                "Mesa de ayuda / responsable operativo.";

            justification =
                `El valor obtenido (${risk}) se encuentra entre 1 y 3. La regla XOR determina que no es necesario activar la ruta de emergencia y se mantiene dentro del flujo de mantenimiento y monitoreo.`;


            problem =
                `El incidente "${incidentName}" presenta un nivel marginal con probabilidad ${probability} e impacto ${impact}.`;

            feedback =
                "El riesgo actual es limitado. Sin embargo, conservar el registro permite identificar si el incidente se vuelve recurrente.";

            solution =
                "Mantener el incidente documentado, realizar seguimiento básico y aplicar una acción preventiva si se identifica una causa recurrente.";

        }


        return {
            problem,
            feedback,
            solution,
            action,
            responsible,
            priority,
            justification
        };

    }


    /* ==========================================================
       MOSTRAR FEEDBACK
    ========================================================== */

    function showFeedback(data) {

        document
            .getElementById("feedbackPlaceholder")
            .style.display = "none";

        document
            .getElementById("feedbackContent")
            .style.display = "grid";


        document
            .getElementById("feedbackProblem")
            .textContent =
            data.problem;


        document
            .getElementById("feedbackText")
            .textContent =
            data.feedback;


        document
            .getElementById("feedbackSolution")
            .textContent =
            data.solution;


        document
            .getElementById("feedbackAction")
            .textContent =
            data.action;


        document
            .getElementById("feedbackResponsible")
            .textContent =
            data.responsible;


        document
            .getElementById("feedbackPriority")
            .textContent =
            data.priority;


        document
            .getElementById("feedbackJustification")
            .textContent =
            data.justification;

    }


    /* ==========================================================
       PREVISUALIZACIÓN
    ========================================================== */

    function updatePreview() {

        const p =
            document.querySelector(
                'input[name="probability"]:checked'
            );

        const i =
            document.querySelector(
                'input[name="impact"]:checked'
            );


        if (!p || !i) {

            previewRisk.textContent = "—";

            previewLevel.textContent =
                "Pendiente";

            previewLevel.className =
                "risk-level risk-default";

            return;

        }


        const probability =
            Number(p.value);

        const impact =
            Number(i.value);

        const risk =
            probability * impact;

        const severity =
            getSeverity(risk);


        previewRisk.textContent =
            risk;

        previewLevel.textContent =
            severity.name;

        previewLevel.className =
            "risk-level";

        previewLevel.style.background =
            severity.color + "22";

        previewLevel.style.color =
            severity.color;

    }


    document
        .querySelectorAll(
            'input[name="probability"], input[name="impact"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                updatePreview
            );

        });


    /* ==========================================================
       RESET BPMN
    ========================================================== */

    function resetBpmn() {

        Object.values(nodes)
            .forEach(node => {

                node.classList.remove(
                    "active"
                );

            });


        parallelContainer
            .classList.remove(
                "visible"
            );


        document
            .getElementById("bpmnStatus")
            .textContent =
            "ESPERANDO";


        document
            .getElementById("bpmnStatus")
            .className =
            "badge badge-green";


        processResult.innerHTML = `
            <strong>Estado:</strong>
            Registra un incidente para iniciar
            el proceso BPMN.
        `;

    }


    /* ==========================================================
       WAIT
    ========================================================== */

    function wait(ms) {

        return new Promise(
            resolve =>
                setTimeout(resolve, ms)
        );

    }


    /* ==========================================================
       ACTIVAR NODO
    ========================================================== */

    function activate(node) {

        node.classList.add(
            "active"
        );

    }


    /* ==========================================================
       ANIMACIÓN BPMN
    ========================================================== */

    async function animateProcess(
        risk,
        incidentName
    ) {

        resetBpmn();


        const bpmnStatus =
            document.getElementById(
                "bpmnStatus"
            );


        bpmnStatus.textContent =
            "PROCESANDO";

        bpmnStatus.className =
            "badge badge-yellow";


        /* INICIO */

        activate(
            nodes.start
        );

        processResult.innerHTML = `
            <strong>Evento Inicio:</strong>
            Se registra el incidente
            "${escapeHtml(incidentName)}".
        `;

        await wait(700);


        /* EVALUACIÓN */

        activate(
            nodes.evaluation
        );

        processResult.innerHTML = `
            <strong>Evaluación:</strong>
            Se calcula P × I = ${risk}.
        `;

        await wait(900);


        /* XOR */

        activate(
            nodes.xor
        );

        processResult.innerHTML = `
            <strong>Compuerta XOR:</strong>
            Se determina la ruta de atención
            según el valor del riesgo.
        `;

        await wait(900);


        /* CRÍTICO */

        if (risk >= 16) {

            parallelContainer
                .classList.add(
                    "visible"
                );


            bpmnStatus.textContent =
                "EMERGENCIA CRÍTICA";

            bpmnStatus.className =
                "badge badge-red";


            processResult.innerHTML = `
                <strong>Decisión:</strong>
                Riesgo ${risk} ≥ 16.
                Se activa Atención de Emergencia Crítica.
            `;

            await wait(900);


            /* DEVOPS */

            activate(
                nodes.devops
            );

            processResult.innerHTML = `
                <strong>Rama A · DevOps:</strong>
                Aislamiento del servicio y bloqueo
                de puertos cuando corresponda.
            `;

            await wait(900);


            /* CISO */

            activate(
                nodes.ciso
            );

            processResult.innerHTML = `
                <strong>Rama B · CISO:</strong>
                Notificación y auditoría inmediata
                de seguridad.
            `;

            await wait(1100);

        }


        /* NO CRÍTICO */

        else {

            activate(
                nodes.maintenance
            );


            bpmnStatus.textContent =
                "MANTENIMIENTO";

            bpmnStatus.className =
                "badge badge-orange";


            processResult.innerHTML = `
                <strong>Decisión:</strong>
                Riesgo ${risk} < 16.
                Se deriva a Mantenimiento Programado
                / Monitoreo SLA.
            `;

            await wait(1400);

        }


        /* FIN */

        activate(
            nodes.end
        );


        bpmnStatus.textContent =
            "PROCESO COMPLETADO";

        bpmnStatus.className =
            "badge badge-green";


        processResult.innerHTML = `
            <strong>Evento Fin:</strong>
            El flujo finaliza con una acción
            de mitigación o seguimiento definida.
        `;

    }


    /* ==========================================================
       SUBMIT
    ========================================================== */

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const incidentName =
                document
                    .getElementById(
                        "incidentName"
                    )
                    .value
                    .trim();


            const type =
                document
                    .getElementById(
                        "riskType"
                    )
                    .value;


            const p =
                document.querySelector(
                    'input[name="probability"]:checked'
                );


            const i =
                document.querySelector(
                    'input[name="impact"]:checked'
                );


            if (
                !incidentName ||
                !type ||
                !p ||
                !i
            ) {

                showToast(
                    "Formulario incompleto",
                    "Completa todos los campos."
                );

                return;

            }


            const probability =
                Number(p.value);

            const impact =
                Number(i.value);


            const risk =
                probability * impact;


            const severity =
                getSeverity(risk);


            /* Generar diagnóstico */

            const feedback =
                generateFeedback(
                    incidentName,
                    type,
                    probability,
                    impact,
                    risk
                );


            showFeedback(
                feedback
            );


            /* ID */

            incidentCounter++;


            const action =
                risk >= 16
                    ?
                    "Emergencia Crítica"
                    :
                    "Mantenimiento / SLA";


            const incident = {

                id:
                    `INC-${String(
                        incidentCounter
                    ).padStart(3,"0")}`,

                name:
                    incidentName,

                type:
                    type,

                probability:
                    probability,

                impact:
                    impact,

                risk:
                    risk,

                severity:
                    severity.name,

                color:
                    severity.color,

                action:
                    action

            };


            incidents.push(
                incident
            );


            renderHistory();

            updateMetrics();

            updateChart();


            showToast(
                "Incidente procesado",
                `${incident.id} · Riesgo ${risk} · ${severity.name}`
            );


            await animateProcess(
                risk,
                incidentName
            );

        }
    );


    /* ==========================================================
       TABLA
    ========================================================== */

    function renderHistory() {

        historyBody.innerHTML = "";


        if (
            incidents.length === 0
        ) {

            historyBody.innerHTML = `
                <tr>
                    <td
                        colspan="8"
                        style="
                            text-align:center;
                            padding:30px;
                            color:#64748b;
                        "
                    >
                        No existen incidentes evaluados.
                    </td>
                </tr>
            `;

            return;

        }


        incidents
            .slice()
            .reverse()
            .forEach(
                incident => {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    const severity =
                        getSeverity(
                            incident.risk
                        );


                    row.innerHTML = `

                        <td>
                            <strong>
                                ${incident.id}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(
                                incident.name
                            )}
                        </td>

                        <td>
                            ${incident.type}
                        </td>

                        <td>
                            ${incident.probability}
                        </td>

                        <td>
                            ${incident.impact}
                        </td>

                        <td>
                            <strong>
                                ${incident.risk}
                            </strong>
                            /25
                        </td>

                        <td>

                            <span
                                class="
                                    badge
                                    ${severity.className}
                                "
                            >
                                ${severity.name}
                            </span>

                        </td>

                        <td>
                            ${incident.action}
                        </td>

                    `;


                    historyBody.appendChild(
                        row
                    );

                }
            );

    }


    /* ==========================================================
       ESCAPE HTML
    ========================================================== */

    function escapeHtml(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text;

        return div.innerHTML;

    }


    /* ==========================================================
       MÉTRICAS
    ========================================================== */

    function updateMetrics() {

        const total =
            incidents.length;


        const critical =
            incidents.filter(
                incident =>
                    incident.risk >= 16
            ).length;


        const average =
            total === 0
                ?
                0
                :
                (
                    incidents.reduce(
                        (
                            total,
                            incident
                        ) =>
                            total +
                            incident.risk,
                        0
                    )
                    /
                    total
                ).toFixed(1);


        document
            .getElementById(
                "totalIncidents"
            )
            .textContent =
            total;


        document
            .getElementById(
                "criticalIncidents"
            )
            .textContent =
            critical;


        document
            .getElementById(
                "averageRisk"
            )
            .textContent =
            average;


        if (total > 0) {

            document
                .getElementById(
                    "lastStatus"
                )
                .textContent =
                incidents[
                    incidents.length - 1
                ].severity;

        }

        else {

            document
                .getElementById(
                    "lastStatus"
                )
                .textContent =
                "Esperando";

        }

    }


    /* ==========================================================
       CHART
    ========================================================== */

    function createChart() {

        const context =
            document
                .getElementById(
                    "riskChart"
                )
                .getContext(
                    "2d"
                );


        riskChart =
            new Chart(
                context,
                {

                    type: "bar",

                    data: {

                        labels: [],

                        datasets: [

                            {

                                label:
                                    "Valor del Riesgo",

                                data: [],

                                backgroundColor: [],

                                borderRadius: 7,

                                borderWidth: 1

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        scales: {

                            y: {

                                beginAtZero: true,

                                max: 25,

                                ticks: {
                                    color:
                                        "#94a3b8"
                                },

                                grid: {
                                    color:
                                        "rgba(148,163,184,.1)"
                                },

                                title: {

                                    display: true,

                                    text:
                                        "Valor del riesgo",

                                    color:
                                        "#94a3b8"

                                }

                            },

                            x: {

                                ticks: {
                                    color:
                                        "#94a3b8"
                                },

                                grid: {
                                    display: false
                                }

                            }

                        },

                        plugins: {

                            legend: {

                                labels: {
                                    color:
                                        "#cbd5e1"
                                }

                            }

                        }

                    }

                }
            );

    }


    /* ==========================================================
       ACTUALIZAR CHART
    ========================================================== */

    function updateChart() {

        if (!riskChart) {
            return;
        }


        riskChart.data.labels =
            incidents.map(
                incident =>
                    incident.id
            );


        riskChart.data.datasets[0]
            .data =
            incidents.map(
                incident =>
                    incident.risk
            );


        riskChart.data.datasets[0]
            .backgroundColor =
            incidents.map(
                incident =>
                    incident.color
            );


        riskChart.update();

    }


    /* ==========================================================
       EJEMPLOS
    ========================================================== */

    document
        .getElementById(
            "exampleBtn"
        )
        .addEventListener(
            "click",
            function() {

                const examples = [

                    {
                        name:
                            "Ataque de malware",

                        type:
                            "Lógico",

                        p: 5,
                        i: 5
                    },

                    {
                        name:
                            "Caída del servidor principal",

                        type:
                            "Lógico",

                        p: 4,
                        i: 4
                    },

                    {
                        name:
                            "Error de configuración",

                        type:
                            "Humano",

                        p: 3,
                        i: 3
                    },

                    {
                        name:
                            "Falla de climatización",

                        type:
                            "Físico",

                        p: 2,
                        i: 4
                    },

                    {
                        name:
                            "Contraseña compartida",

                        type:
                            "Humano",

                        p: 4,
                        i: 4
                    },

                    {
                        name:
                            "Interrupción temporal de red",

                        type:
                            "Físico",

                        p: 1,
                        i: 2
                    }

                ];


                const example =
                    examples[
                        Math.floor(
                            Math.random()
                            *
                            examples.length
                        )
                    ];


                document
                    .getElementById(
                        "incidentName"
                    )
                    .value =
                    example.name;


                document
                    .getElementById(
                        "riskType"
                    )
                    .value =
                    example.type;


                document
                    .getElementById(
                        `p${example.p}`
                    )
                    .checked =
                    true;


                document
                    .getElementById(
                        `i${example.i}`
                    )
                    .checked =
                    true;


                updatePreview();


                showToast(
                    "Ejemplo cargado",
                    "Presiona Evaluar y Procesar."
                );

            }
        );


    /* ==========================================================
       LIMPIAR
    ========================================================== */

    document
        .getElementById(
            "clearBtn"
        )
        .addEventListener(
            "click",
            function() {

                if (
                    incidents.length === 0
                ) {

                    showToast(
                        "Historial vacío",
                        "No hay registros."
                    );

                    return;

                }


                if (
                    !confirm(
                        "¿Deseas eliminar todo el historial?"
                    )
                ) {

                    return;

                }


                incidents = [];

                incidentCounter = 0;


                renderHistory();

                updateMetrics();

                updateChart();

                resetBpmn();


                document
                    .getElementById(
                        "feedbackPlaceholder"
                    )
                    .style.display =
                    "block";


                document
                    .getElementById(
                        "feedbackContent"
                    )
                    .style.display =
                    "none";


                showToast(
                    "Historial eliminado",
                    "Se eliminaron los registros."
                );

            }
        );


    /* ==========================================================
       TOAST
    ========================================================== */

    function showToast(
        title,
        message
    ) {

        const toast =
            document.getElementById(
                "toast"
            );


        document
            .getElementById(
                "toastTitle"
            )
            .textContent =
            title;


        document
            .getElementById(
                "toastMessage"
            )
            .textContent =
            message;


        toast.classList.add(
            "show"
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );

    }


    /* ==========================================================
       INICIALIZACIÓN
    ========================================================== */

    createChart();

    renderHistory();

    updateMetrics();

    updatePreview();

    resetBpmn();

