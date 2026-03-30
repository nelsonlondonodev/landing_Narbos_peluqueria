/**
 * OxidationCalculator Controller
 * Maneja la lógica interactiva de la Calculadora de Oxidación en artículos del blog.
 * Sigue los principios de funciones atómicas y Clean Code.
 */
export default class OxidationCalculator {
    constructor() {
        this.btn = document.getElementById('calc-btn');
        this.sunInput = document.getElementById('calc-sun');
        this.washInput = document.getElementById('calc-wash');
        this.resultContainer = document.getElementById('calc-result');
        this.titleElement = document.getElementById('calc-title');
        this.msgElement = document.getElementById('calc-msg');

        if (this.btn && this.sunInput && this.washInput) {
            this.init();
        }
    }

    /**
     * Inicializa los listeners de la calculadora.
     */
    init() {
        this.btn.addEventListener('click', () => this.calculate());
    }

    /**
     * Orquesta el cálculo del riesgo y la actualización de la UI.
     */
    calculate() {
        const sunExposure = this.sunInput.value;
        const washFrequency = parseInt(this.washInput.value);
        
        const riskScore = this._getRiskScore(sunExposure, washFrequency);
        const resultData = this._getResultData(riskScore);
        
        this._updateUI(resultData);
    }

    /**
     * Calcula una puntuación numérica de riesgo (Función Atómica).
     * @private
     */
    _getRiskScore(sun, wash) {
        let score = 1;
        if (sun === 'high') score += 2;
        if (sun === 'med') score += 1;
        if (wash === 1) score += 2; // Lavado diario con agua dura
        return score;
    }

    /**
     * Obtiene los metadatos visuales y de texto basados en el riesgo (Función Atómica).
     * @private
     */
    _getResultData(score) {
        if (score >= 4) {
            return {
                level: 'ALTO',
                classes: 'bg-red-50 border-red-500 text-red-800',
                titleIcon: '🚨',
                message: "¡Cuidado! El agua dura combinada con alta exposición solar hará que tu rubio se vuelva cobrizo en menos de 2 semanas. <strong>Recomendación:</strong> Usa protector UV capilar CADA MAÑANA, lávate el cabello día de por medio, y agenda un baño de color (matizante) mensualmente con nosotros."
            };
        } else if (score >= 2) {
            return {
                level: 'MODERADO',
                classes: 'bg-yellow-50 border-yellow-500 text-yellow-800',
                titleIcon: '⚠️',
                message: "Tu cabello está expuesto. Vas a notar ligeros tonos dorados indeseados a los 20 días. <strong>Recomendación:</strong> Incorpora un shampoo corrector violeta (solo una vez por semana) y trata de lavar tu cabello un poco menos frecuente."
            };
        }
        
        return {
            level: 'BAJO',
            classes: 'bg-green-50 border-green-500 text-green-800',
            titleIcon: '✨',
            message: "Tienes rutinas bastante seguras. Aún así, recuerda que debido al agua de la sabana, tus cutículas pueden estar sufriendo resequedad. <strong>Recomendación:</strong> Aplica semanalmente una mascarilla ácida y mantén la hidratación al máximo."
        };
    }

    /**
     * Actualiza los elementos del DOM (Función Atómica).
     * @private
     */
    _updateUI(data) {
        this.resultContainer.classList.remove('hidden');
        this.resultContainer.className = `mt-8 p-6 rounded-xl shadow border-l-4 animate__animated animate__fadeIn ${data.classes}`;
        
        this.titleElement.innerHTML = `${data.titleIcon} Riesgo de Oxidación: ${data.level}`;
        this.titleElement.className = `text-xl font-bold mb-2 ${data.classes.split(' ').pop()}`; // Toma la última clase de color de texto
        
        this.msgElement.innerHTML = data.message;
        
        // Scroll suave al resultado para mejor UX en móviles
        this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
