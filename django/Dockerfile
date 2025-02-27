
FROM ubuntu:latest

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    tzdata python3.10 python3.10-venv python3.10-dev python3-pip \
    libpq-dev  

WORKDIR /home


RUN python3.10 -m venv env
ENV PATH="/home/env/bin:$PATH"


COPY requirements.txt /tmp/requirements.txt


RUN /home/env/bin/pip install  --upgrade pip && \
    /home/env/bin/pip install  --requirement /tmp/requirements.txt --no-deps --disable-pip-version-check

RUN /home/env/bin/pip install sqlparse

RUN /home/env/bin/pip show torch > /dev/null || \
    /home/env/bin/pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu


# ✅ Copy application files after dependencies are installed
COPY . .

# ✅ Set working directory to backend (if applicable)
WORKDIR /home/backend

# ✅ Expose Django's default port
EXPOSE 8000


RUN test -f /home/backend/no-migrate || /home/env/bin/python manage.py migrate || true



