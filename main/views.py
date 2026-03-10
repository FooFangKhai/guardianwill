from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactSubmission


def home(request):
    return render(request, 'main/home.html')


def packages(request):
    return render(request, 'main/packages.html')


def services(request):
    return render(request, 'main/services.html')


def about(request):
    return render(request, 'main/about.html')


def faq(request):
    faqs = [
        {
            'question': 'What is a Will?',
            'answer': 'A Will is a legal document that expresses a person\'s wishes as to how their property is to be distributed after their death and as to which person(s) is to manage the property until its final distribution.'
        },
        {
            'question': 'What if I die without a Will?',
            'answer': 'If you die without a Will (intestate), your estate will be distributed according to the Distribution Act 1958 (for non-Muslims) or Faraid Law (for Muslims). This may not reflect your actual wishes and could cause hardship for your loved ones.'
        },
        {
            'question': 'Who can write a will?',
            'answer': 'Any person who is 18 years old or above, of sound mind, and not under any undue influence or duress can write a Will. The Will must be signed by the testator and witnessed by two witnesses who are present at the same time.'
        },
        {
            'question': 'Who can prepare the Will for you?',
            'answer': 'A Will can be prepared by the testator themselves, a solicitor, or a qualified Will writer. GuardianWill provides an easy-to-use online platform that guides you through the process of creating a legally valid Will.'
        },
        {
            'question': 'Is the Will generated from this online system legitimate?',
            'answer': 'Yes. The Wills generated through GuardianWill are meticulously drafted and vetted by professional solicitors to ensure they are legally binding and comply with Malaysian law.'
        },
        {
            'question': 'When should I update my Will?',
            'answer': 'You should update your Will after major life events such as marriage, divorce, the birth of a child or grandchild, the death of a beneficiary or executor, significant changes in your assets, or simply because your wishes have changed.'
        },
        {
            'question': 'Parties Named in the Will',
            'answer': 'Key parties in a Will include: the Testator (the person making the Will), the Executor (the person named to carry out the wishes in the Will), the Beneficiary (the person who will receive assets), and the Guardian (person appointed to care for minor children).'
        },
        {
            'question': 'What does an executor do?',
            'answer': 'An executor is responsible for administering the estate of the deceased. This includes collecting and managing assets, paying debts and taxes, and distributing the remaining assets to the beneficiaries as specified in the Will.'
        },
        {
            'question': 'Whom should I select to be my executor?',
            'answer': 'Your executor should be someone you trust completely, who is capable of handling financial and legal matters, and who is willing to take on the responsibility. Many people choose a close family member, a trusted friend, or a professional (such as a solicitor or trust company).'
        },
        {
            'question': 'What is estate administration?',
            'answer': 'Estate administration is the process of managing and distributing a deceased person\'s estate. This involves applying for a Grant of Probate, collecting all assets, paying outstanding debts, and distributing the remainder to beneficiaries.'
        },
    ]
    return render(request, 'main/faq.html', {'faqs': faqs})


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and message:
            ContactSubmission.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message,
            )
            messages.success(request, 'Thank you! Your message has been sent. We will get back to you shortly.')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill in all required fields.')

    return render(request, 'main/contact.html')


def login_view(request):
    return render(request, 'main/login.html')
