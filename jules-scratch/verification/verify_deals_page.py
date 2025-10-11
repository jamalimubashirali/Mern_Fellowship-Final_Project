from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/deals")
    page.click("text=Create Deal")
    page.screenshot(path="jules-scratch/verification/create_deal_modal.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
