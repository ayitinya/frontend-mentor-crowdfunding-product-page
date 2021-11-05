const root = document.querySelector(":root")
const hamburgerBtn = document.getElementsByClassName("hamburger-btn")[0]
const mobileNav = document.getElementsByClassName("nav-mobile")[0]
const navModal = document.querySelector("#nav-modal")
const nav = document.querySelector("nav")
const bookmarkCircle = document.querySelector("#bookmark-circle")
const bookmark = document.querySelector("#bookmark")
const bookmarkBtn = document.querySelector("#bookmark-button")
const bookmarkBtnText = document.querySelector("#bookmark-btn-text")
const projectModal = document.querySelector("#project-modal")
const modalClose = document.querySelector("#modal-close")
const backProjectBtn = document.querySelector("#back-project-btn")
const radioBtns = document.querySelectorAll("input[type='radio']")
const radioBtnsParentCard = document.querySelectorAll("#project-modal .card")
const pledgeTab = document.querySelectorAll(".pledge-amount")

const closeSuccessModal = document.querySelector("#close-success-modal")
const successModal = document.querySelector("#success-modal")

const bambooNumber = document.querySelectorAll(".bamboo-number")
const blackEditionNumber = document.querySelectorAll(".black-edition-number")
const mahoganyNumber = document.querySelectorAll(".mahogany-number")
const pledgedAmountText = document.querySelector("#pledged-amount")

const bambooPledgeBtn = document.querySelector("#bamboo-pledge-btn")
const blackEditionPledgeBtn = document.querySelector(
	"#black-edition-pledge-btn"
)
const mahoganyPledgeBtn = document.querySelector("#mahogany-pledge-btn")
const noRewardPledgeBtn = document.querySelector("#no-reward-pledge-btn")

const bambooPledgeInput = document.querySelector("#bamboo-pledge-input")
const blackEditionPledgeInput = document.querySelector(
	"#black-edition-pledge-input"
)
const mahoganyPledgeInput = document.querySelector("#mahogany-pledge-input")
const noRewardPledgeInput = document.querySelector("#no-reward-pledge-input")

const bambooSelectRewardBtn = document.querySelector(
	"#bamboo-select-reward-btn"
)
const blackEditionSelectRewardBtn = document.querySelector(
	"#black-edition-select-reward-btn"
)
const mahoganySelectRewardBtn = document.querySelector(
	"#mahogany-select-reward-btn"
)

const bookmarkCircleColor = "#2F2F2F"
const bookmarkColor = "#B1B1B1"

let bambooStands = 101
let blackEditionStand = 64
let mahoganySpecialStand = 0

const totalPledge = 100000

let pledgedAmount = 89914
let bookmarked = false

const setProgressWidth = () => {
	root.style.setProperty(
		"--progress-width",
		`${(pledgedAmount / totalPledge) * 100}%`
	)
}

const updateStandNumbers = () => {
	for (stand of bambooNumber) {
		stand.innerText = bambooStands
	}
	for (stand of blackEditionNumber) {
		stand.innerText = blackEditionStand
	}
	for (stand of mahoganyNumber) {
		stand.innerText = mahoganySpecialStand
	}
	pledgedAmountText.innerText = pledgedAmount.toLocaleString("en-us")
}

updateStandNumbers()

const mahoganyRadioBtn = document.querySelector("#mahogany")
mahoganySelectRewardBtn.addEventListener("click", () => {
	mahoganyRadioBtn.click()
	projectModal.style.display = "flex"
	mahoganyRadioBtn.scrollIntoView()
})

const bambooRadioBtn = document.querySelector("#bamboo-stand")
bambooSelectRewardBtn.addEventListener("click", () => {
	bambooRadioBtn.click()
	projectModal.style.display = "flex"
	bambooRadioBtn.scrollIntoView()
})

const blackEditionRadioBtn = document.querySelector("#black-edition")
blackEditionSelectRewardBtn.addEventListener("click", () => {
	blackEditionRadioBtn.click()
	projectModal.style.display = "flex"
	blackEditionRadioBtn.scrollIntoView()
})

closeSuccessModal.addEventListener("click", () => {
	successModal.style.display = "none"
})

noRewardPledgeBtn.addEventListener("click", () => {
	if (Number(noRewardPledgeInput.value) > 0) {
		pledgedAmount += Number(noRewardPledgeInput.value)
		setProgressWidth()
		updateStandNumbers()
		projectModal.style.display = "none"
		return (successModal.style.display = "block")
	}
	alert(`Please pledge more than $0`)
})

bambooPledgeBtn.addEventListener("click", () => {
	if (Number(bambooPledgeInput.value) >= Number(bambooPledgeInput.min)) {
		bambooStands--
		console.log(bambooPledgeInput.value, pledgedAmount)
		pledgedAmount += Number(bambooPledgeInput.value)
		setProgressWidth()
		updateStandNumbers()
		projectModal.style.display = "none"

		return (successModal.style.display = "block")
	}
	alert(`Please pledge more than ${bambooPledgeInput.min}`)
})

blackEditionPledgeBtn.addEventListener("click", () => {
	if (
		Number(blackEditionPledgeInput.value) >= Number(blackEditionPledgeInput.min)
	) {
		blackEditionStand--
		pledgedAmount += Number(blackEditionPledgeInput.value)
		setProgressWidth()
		updateStandNumbers()
		projectModal.style.display = "none"

		return (successModal.style.display = "block")
	}
	alert(`Please pledge more than ${blackEditionPledgeInput.min}`)
})

mahoganyPledgeBtn.addEventListener("click", () => {
	if (Number(mahoganyPledgeInput.value) >= Number(mahoganyPledgeInput.min)) {
		mahoganySpecialStand--
		pledgedAmount += Number(mahoganyPledgeInput.value)
		setProgressWidth()
		updateStandNumbers()
		projectModal.style.display = "none"

		return (successModal.style.display = "block")
	}
	alert(`Please pledge more than ${mahoganyPledgeInput.min}`)
})

setProgressWidth()

localStorage.getItem("bookmarked")
	? (bookmarked = JSON.parse(localStorage.getItem("bookmarked")))
	: localStorage.setItem("bookmarked", "false")

const bookmarkBtnColor = () => {
	if (bookmarked == true) {
		bookmarkCircle.style.fill = "var(--dark-cyan)"
		bookmark.style.fill = "#fff"
		bookmarkBtnText.innerHTML = "Bookmarked"
		bookmarkBtnText.style.color = "var(--dark-cyan)"
	} else {
		bookmarkCircle.style.fill = bookmarkCircleColor
		bookmark.style.fill = bookmarkColor
		bookmarkBtnText.innerHTML = "Bookmark"
		bookmarkBtnText.style.color = "var(--gray)"
	}
}

bookmarkBtnColor()

for (const btn of radioBtns) {
	btn.addEventListener("click", () => {
		for (const card of radioBtnsParentCard) {
			card.style.border = "hsl(0, 5%, 92.2%) 1px solid"
		}
		for (const tab of pledgeTab) {
			tab.style.display = "none"
		}
		const childElemCount = btn.parentElement.parentElement.childElementCount
		btn.parentElement.parentElement.children[childElemCount - 1].style.display =
			"grid"
		btn.parentElement.parentElement.style.border = "var(--cyan) 1px solid"
	})
}

modalClose.addEventListener("click", () => {
	projectModal.style.display = "none"
})

backProjectBtn.addEventListener("click", () => {
	projectModal.style.display = "flex"
})

bookmarkBtn.addEventListener("click", () => {
	bookmarked = !bookmarked
	localStorage.setItem("bookmarked", `${bookmarked}`)
	bookmarkBtnColor()
})

hamburgerBtn.addEventListener("click", () => {
	if (mobileNav.style.display !== "block") {
		mobileNav.style.display = "block"
		navModal.style.zIndex = "999"
		navModal.style.display = "flex"
		nav.style.display = "none"
	} else {
		mobileNav.style.display = "none"
		navModal.style.display = "none"
		navModal.style.zIndex = "-1"
		nav.style.display = "flex"
	}
})

navModal.addEventListener("click", () => {
	if (mobileNav.style.display !== "none") {
		nav.style.display = "flex"
		mobileNav.style.display = "none"
		navModal.style.zIndex = "-1"
		navModal.style.display = "none"
		hamburgerBtn.style.display = "block"
	} else {
		nav.style.display = "none"
		mobileNav.style.display = "block"
		navModal.style.display = "flex"
		navModal.style.zIndex = "999"
	}
})
